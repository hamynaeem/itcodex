import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  user,
  updateProfile,
  User as FirebaseUser,
  UserCredential
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable, from, map, catchError, of, throwError, switchMap } from 'rxjs';

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: FirebaseUser;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // Observable of current user
  user$ = user(this.auth);

  constructor() {
    // Log auth state changes
    this.user$.subscribe(user => {
      if (user) {
        console.log('User signed in:', user.email);
      } else {
        console.log('User signed out');
      }
    });
  }

  /**
   * Sign up new user with email and password
   */
  async signUp(email: string, password: string, username: string): Promise<AuthResult> {
    try {
      // Check if username is already taken
      const usernameExists = await this.checkUsernameExists(username);
      if (usernameExists) {
        return {
          success: false,
          message: 'Username is already taken. Please choose a different one.'
        };
      }

      // Create user account
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );

      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: username
      });

      // Create user profile document in Firestore
      await this.createUserProfile(user, username);

      return {
        success: true,
        message: 'Account created successfully!',
        user: user
      };

    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error),
        error: error
      };
    }
  }

  /**
   * Sign in existing user with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );

      return {
        success: true,
        message: 'Signed in successfully!',
        user: userCredential.user
      };

    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: this.getErrorMessage(error),
        error: error
      };
    }
  }

  /**
   * Sign out current user
   */
  async signOutUser(): Promise<AuthResult> {
    try {
      await signOut(this.auth);
      return {
        success: true,
        message: 'Signed out successfully!'
      };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        success: false,
        message: 'Error signing out',
        error: error
      };
    }
  }

  /**
   * Create user profile document in Firestore
   */
  private async createUserProfile(user: FirebaseUser, username: string): Promise<void> {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      username: username,
      displayName: username,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to users collection
    const userDocRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userDocRef, userProfile);
  }

  /**
   * Check if username already exists
   */
  private async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  }

  /**
   * Get user profile from Firestore
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile in Firestore
   */
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      await setDoc(userDocRef, {
        ...updates,
        updatedAt: new Date()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  /**
   * Get current user profile as Observable
   */
  getCurrentUserProfile(): Observable<UserProfile | null> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return from(this.getUserProfile(user.uid));
        }
        return of(null);
      })
    );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  /**
   * Convert Firebase error codes to user-friendly messages
   */
  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered. Please use a different email or try signing in.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      case 'auth/invalid-credential':
        return 'Invalid credentials. Please check your email and password.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }
}