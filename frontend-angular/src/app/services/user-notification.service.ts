import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { Notification } from '../model/user/notfication';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  private socket: Socket;
  private notificationsSource = new BehaviorSubject<Notification[]>([]); // Store notifications
  notifications$ = this.notificationsSource.asObservable();

  constructor(private http: HttpClient) {

    this.socket = io('http://localhost:3000');


    this.socket.on('notification', (message: string) => {
      this.fetchNotifications();
    });
  }

  // Fetching all notifications from the backend
  fetchNotifications() {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    const url = `http://localhost:9500/api/v1/notifications/user/${userId}`;

    this.http.get<IApiResponse>(url).subscribe(
      (response) => {

        if (response.status === 'success') {
          const notifications = response.data;
          this.notificationsSource.next(notifications);
        }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }


  registerUser(userId: number) {
    this.socket.emit('register', userId);
  }


  markAsRead(notificationId: number) {

    console.log(`Marking notification with ID: ${notificationId} as read`);
  }

  clearNotifications() {
    this.notificationsSource.next([]); // Set the notifications list to an empty array
  }
}
