import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Analytics } from '@angular/fire/analytics';
import { DataConnect } from '@angular/fire/data-connect';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-firebase',
  imports: [CommonModule],
  templateUrl: './firebase.html',
  styleUrl: './firebase.css',
})
export class Firebase implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private analytics = inject(Analytics);
  private dataConnect = inject(DataConnect);

  firebaseStatus = {
    auth: false,
    firestore: false,
    analytics: false,
    dataConnect: false,
    appName: '',
    projectId: ''
  };

  ngOnInit() {
    this.checkFirebaseConnection();
  }

  checkFirebaseConnection() {
    try {
      // Check Auth
      if (this.auth && this.auth.app) {
        this.firebaseStatus.auth = true;
        this.firebaseStatus.appName = this.auth.app.name;
        this.firebaseStatus.projectId = this.auth.app.options.projectId || '';
        console.log('✅ Firebase Auth connected:', this.auth.app);
      }

      // Check Firestore
      if (this.firestore && this.firestore.app) {
        this.firebaseStatus.firestore = true;
        console.log('✅ Firebase Firestore connected:', this.firestore.app);
      }

      // Check Analytics
      if (this.analytics && this.analytics.app) {
        this.firebaseStatus.analytics = true;
        console.log('✅ Firebase Analytics connected:', this.analytics.app);
      }

      // Check Data Connect
      if (this.dataConnect) {
        this.firebaseStatus.dataConnect = true;
        console.log('✅ Firebase Data Connect connected');
      }

      console.log('🔥 Firebase Connection Status:', this.firebaseStatus);
      
    } catch (error) {
      console.error('❌ Error checking Firebase connection:', error);
    }
  }

  testFirebaseServices() {
    console.log('🧪 Testing Firebase Services...');
    
    // Test Auth state
    this.auth.onAuthStateChanged((user) => {
      console.log('Auth State:', user ? 'User logged in' : 'No user');
    });

    // You can add more service tests here
    console.log('All Firebase services tested. Check console for results.');
  }
}
