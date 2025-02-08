import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user/user';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RouterLink } from '@angular/router';
import { Notification } from '../../../../model/user/notfication';
import { UserNotificationService } from '../../../../services/user-notification.service';
import { UserAuthService } from '../../../../services/user-auth.service';
import { SidebarService } from '../../../../services/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  notifications: Notification[] = [];
  dropdownOpen = false;

  constructor(private userProfileService: UserProfileService,
    private notificationService: UserNotificationService,
    private authService: UserAuthService,
    private sidebarService: SidebarService
  ) { }

  user: User | null = null;
  isUserMenuOpen: boolean = false;

  openSidebar() {
    this.sidebarService.openSidebar(); // Opening the sidebar
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Variable to hold the user data

  ngOnInit(): void {

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    // Subscribing to user data changes
    this.userProfileService.user$.subscribe(user => {
      this.user = user; // Automatically get updated user data
    });

    if (userId) {
      // Registering user to receive notifications
      this.notificationService.registerUser(userId);
      // Fetching initial notifications
      this.notificationService.fetchNotifications();
    }

    // Subscribing to the notifications
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      console.log(this.notifications)
    });


  }


  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  markAsRead(notificationId: number): void {
    // this logic has not yet been implemented
    console.log(`Marking notification with ID: ${notificationId} as read`);
  }

  onSignOut() {
    this.authService.signOut()
  }

}
