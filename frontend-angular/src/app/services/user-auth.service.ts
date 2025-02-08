import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from './url-builder.service';
import { Signup } from '../model/user/signup';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { Login } from '../model/user/login';
import { Router } from '@angular/router';
import { UserNotificationService } from './user-notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService,
    private router: Router,
    private notificationService: UserNotificationService,
  ) { }

  signup(obj: Signup): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('auth/register');
    return this.http.post<IApiResponse>(url, obj);
  }


  login(obj: Login): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('auth/login');
    return this.http.post<IApiResponse>(url, obj);
  }

  isAuthenticated(): boolean {
    // Logic to check if the user is authenticated based on access token
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).accessToken : null;
    return !!token;  // Returns true if token exists
  }

  signOut() {
    localStorage.removeItem('user');
    this.notificationService.clearNotifications();
    this.router.navigate(['/login'])
  }


}
