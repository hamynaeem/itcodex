import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { Services } from './services/services';
import { Flutter } from './flutter/flutter';
import { Website } from './website/website';
import { User } from './user/user';
import { Firebase } from './firebase/firebase';
import { authGuard, nonAuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full' // important: ensures exact match of ''
  },
  {
    path: 'Home',
    component: Home
  },
  {
    path: 'Services',
    component: Services
  },
  {
    path: 'About',
    component: About
  },
  {
    path: 'Contact',
    component: Contact
  },
  {
    path: 'Flutter',
    component: Flutter,
     
  },

  {
    path: 'Website',
    component: Website,
   
  },
  {
    path:'user',
    component: User,
    canActivate: [nonAuthGuard]
  },
  {
    path: 'firebase',
    component: Firebase,
    canActivate: [authGuard]
  },
  {
    path: 'Firebase',
    component: Firebase,
    canActivate: [authGuard]
  }
];
