import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private authService: UserAuthService
  ) { }

  isSubMenuOpen: boolean = true;
  isSubMenuExpenseOpen: boolean = true;
  isSubMenuLoanOpen: boolean = true;

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
