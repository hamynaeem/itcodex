import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AuthService, AuthResult } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)', maxHeight: '0px' }),
        animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)', maxHeight: '100px' }))
      ]),
      transition(':leave', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'translateY(-20px)', maxHeight: '0px' }))
      ])
    ])
  ]
})
export class User implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  isSignupMode = true;
  isLoading = false;
  private subscriptions: Subscription[] = [];
  
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit() {
    // Check if user is already authenticated
    const authSub = this.authService.user$.subscribe(user => {
      if (user) {
        // User is already signed in, redirect to home or dashboard
        this.router.navigate(['/home']);
      }
    });
    this.subscriptions.push(authSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleMode(isSignup: boolean) {
    this.isSignupMode = isSignup;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  async onSubmit() {
    if (this.isLoading) return;

    // Basic validation
    if (!this.validateForm()) return;

    this.isLoading = true;

    try {
      if (this.isSignupMode) {
        await this.handleSignup();
      } else {
        await this.handleLogin();
      }
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    // Email validation
    if (!this.formData.email || !this.isValidEmail(this.formData.email)) {
      this.notificationService.error('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    // Password validation
    if (!this.formData.password || this.formData.password.length < 6) {
      this.notificationService.error('Invalid Password', 'Password must be at least 6 characters long.');
      return false;
    }

    // Signup specific validations
    if (this.isSignupMode) {
      if (!this.formData.username || this.formData.username.trim().length < 3) {
        this.notificationService.error('Invalid Username', 'Username must be at least 3 characters long.');
        return false;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.notificationService.error('Password Mismatch', 'Passwords do not match. Please try again.');
        return false;
      }
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleSignup() {
    const result: AuthResult = await this.authService.signUp(
      this.formData.email,
      this.formData.password,
      this.formData.username
    );

    if (result.success) {
      this.notificationService.success(
        'Account Created!', 
        'Welcome! Your account has been created successfully.'
      );
      this.resetForm();
      // User will be automatically redirected by the auth state subscription
    } else {
      this.notificationService.error('Signup Failed', result.message);
    }
  }

  async handleLogin() {
    const result: AuthResult = await this.authService.signIn(
      this.formData.email,
      this.formData.password
    );

    if (result.success) {
      this.notificationService.success(
        'Welcome Back!', 
        'You have been signed in successfully.'
      );
      this.resetForm();
      // User will be automatically redirected by the auth state subscription
    } else {
      this.notificationService.error('Login Failed', result.message);
    }
  }
}
