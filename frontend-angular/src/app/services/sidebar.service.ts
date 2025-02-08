import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
    isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

    // Method to open the sidebar
    openSidebar() {
        this.isSidebarOpenSubject.next(true);
    }

    // Method to close the sidebar
    closeSidebar() {
        this.isSidebarOpenSubject.next(false);
    }

    // Method to toggle the sidebar
    toggleSidebar() {
        this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
    }
}
