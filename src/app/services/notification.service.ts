import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // in milliseconds, null for persistent
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<NotificationMessage[]>([]);
  public notifications$ = this.notifications.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addNotification(notification: NotificationMessage): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, notification]);

    // Auto remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  success(title: string, message: string, duration: number = 5000): void {
    this.addNotification({
      id: this.generateId(),
      type: 'success',
      title,
      message,
      duration
    });
  }

  error(title: string, message: string, duration: number = 8000): void {
    this.addNotification({
      id: this.generateId(),
      type: 'error',
      title,
      message,
      duration
    });
  }

  warning(title: string, message: string, duration: number = 6000): void {
    this.addNotification({
      id: this.generateId(),
      type: 'warning',
      title,
      message,
      duration
    });
  }

  info(title: string, message: string, duration: number = 5000): void {
    this.addNotification({
      id: this.generateId(),
      type: 'info',
      title,
      message,
      duration
    });
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(n => n.id !== id));
  }

  clearAll(): void {
    this.notifications.next([]);
  }
}