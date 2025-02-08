import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MobileSidebarComponent } from './sidebar-layout/mobile-sidebar/mobile-sidebar.component';
import { SidebarComponent } from "./sidebar-layout/sidebar/sidebar.component";
import { HeaderComponent } from "./sidebar-layout/header/header.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, MobileSidebarComponent, SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
}
