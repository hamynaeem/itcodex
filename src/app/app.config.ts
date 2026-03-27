import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "kashmirqurbani", 
      appId: "1:598076527131:web:58dfef9b04da23f0675ebe", 
      storageBucket: "kashmirqurbani.firebasestorage.app", 
      apiKey: "AIzaSyC7RJFei9XjkuKmmY5L-hRiVeDBKWyIHHE", 
      authDomain: "kashmirqurbani.firebaseapp.com", 
      messagingSenderId: "598076527131", 
      measurementId: "G-S7R5LRF9DF"
    })), 
    provideAuth(() => getAuth()), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, 
    UserTrackingService, 
    provideFirestore(() => getFirestore()), 
    provideDataConnect(() => getDataConnect({
      connector: "example",
      location: "us-east4",
      service: "softcoder"
    }))
  ]
};
