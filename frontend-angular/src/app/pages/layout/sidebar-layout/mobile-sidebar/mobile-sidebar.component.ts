import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../../../services/user-auth.service';
import { SidebarService } from '../../../../services/sidebar.service';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css'
})
export class MobileSidebarComponent {

  constructor(
    private authService: UserAuthService,
    private sidebarService: SidebarService
  ) { }


  isSubMenuOpen: boolean = true;
  isSubMenuExpenseOpen: boolean = true;
  isSubMenuLoanOpen: boolean = true;

  isSidebarOpen: boolean = false;

  ngOnInit(): void {
    // Subscribing to the sidebar open/close state
    this.sidebarService.isSidebarOpen$.subscribe(
      (isOpen) => (this.isSidebarOpen = isOpen)
    );
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
  }

  toggleMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleExpenseMenu(): void {
    this.isSubMenuExpenseOpen = !this.isSubMenuExpenseOpen;
  }

  toggleLoanMenu(): void {
    this.isSubMenuLoanOpen = !this.isSubMenuLoanOpen;
  }

  onSignOut() {
    this.authService.signOut()
  }
}
