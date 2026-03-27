import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationMessage } from '../services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div 
        *ngFor="let notification of (notificationService.notifications$ | async)" 
        class="notification"
        [ngClass]="'notification-' + notification.type"
        [@slideIn]
        (click)="removeNotification(notification.id)">
        
        <div class="notification-icon">
          <svg *ngIf="notification.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          
          <svg *ngIf="notification.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M15 9l-6 6M9 9l6 6"/>
          </svg>
          
          <svg *ngIf="notification.type === 'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          
          <svg *ngIf="notification.type === 'info'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </div>
        
        <div class="notification-content">
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-message">{{ notification.message }}</div>
        </div>
        
        <button class="notification-close" (click)="removeNotification(notification.id); $event.stopPropagation()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
    }

    .notification {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px 20px;
      margin-bottom: 12px;
      border-radius: 12px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      max-width: 400px;
      min-width: 320px;
      cursor: pointer;
      pointer-events: all;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .notification:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .notification-success {
      background: rgba(16, 185, 129, 0.15);
      border-left: 4px solid #10b981;
    }

    .notification-error {
      background: rgba(239, 68, 68, 0.15);
      border-left: 4px solid #ef4444;
    }

    .notification-warning {
      background: rgba(245, 158, 11, 0.15);
      border-left: 4px solid #f59e0b;
    }

    .notification-info {
      background: rgba(59, 130, 246, 0.15);
      border-left: 4px solid #3b82f6;
    }

    .notification-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-top: 2px;
    }

    .notification-success .notification-icon {
      color: #10b981;
    }

    .notification-error .notification-icon {
      color: #ef4444;
    }

    .notification-warning .notification-icon {
      color: #f59e0b;
    }

    .notification-info .notification-icon {
      color: #3b82f6;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
      line-height: 1.2;
    }

    .notification-message {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.4;
    }

    .notification-close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.2s ease;
      margin-top: -2px;
    }

    .notification-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 480px) {
      .notifications-container {
        top: 10px;
        right: 10px;
        left: 10px;
      }

      .notification {
        min-width: auto;
        max-width: none;
      }
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%) translateY(-20px)' }),
        animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateX(0) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'translateX(100%) translateY(-20px)' }))
      ])
    ])
  ]
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  removeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }
}