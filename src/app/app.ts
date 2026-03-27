import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationComponent } from './components/notification.component';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})export class App implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  protected title = 'softcode';
  isSidebarHidden = false;
  showFooter = true;
  private routerSubscription: Subscription = new Subscription();

  // Auth-related properties
  user$ = this.authService.user$;
  isAuthenticated$ = this.authService.isAuthenticated();

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide footer on user page
        this.showFooter = !event.url.includes('/user');
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  async logout() {
    const result = await this.authService.signOutUser();
    if (result.success) {
      this.notificationService.success('Logged Out', 'You have been successfully logged out.');
      this.router.navigate(['/Home']);
    } else {
      this.notificationService.error('Logout Failed', result.message);
    }
  }
}

