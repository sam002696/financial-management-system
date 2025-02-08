import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlBuilderService {

    private readonly baseUrl = 'http://localhost:9500/api/v1/';  // Set the base URL here

    private readonly expressBaseUrl = 'http://localhost:3000';

    // Method to build the full URL with the provided path
    buildUrl(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    buildNotificationUrl(path: string): string {
        return `${this.expressBaseUrl}${path}`;
    }
}
