import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})export class App {
  protected title = 'softcode';
   isSidebarHidden = false;
isLoggedIn: any;

  constructor( private router: Router) {}



  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

}

