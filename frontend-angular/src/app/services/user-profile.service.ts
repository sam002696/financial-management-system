import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { UrlBuilderService } from './url-builder.service';
import { UpdateUserProfile } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  // Get user data from localStorage
  private getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Updating the user profile and sync with localStorage
  updateUserProfileInfo(obj: UpdateUserProfile): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('users/profile-update');
    return this.http.put<IApiResponse>(url, obj).pipe(

      tap((res: IApiResponse) => {
        if (res.status === 'success') {

          const updatedUser = {
            ...this.getUserFromLocalStorage(),
            username: obj.name,
            email: obj.email,
            balance: obj.balance
          };

          // Saving the updated user to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Emitting the updated user data
          this.userSubject.next(updatedUser);
        }
      })
    );
  }

  // Fetching user profile information
  getUserProfileInfo(): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('users/profile-info');
    return this.http.get<IApiResponse>(url);
  }

  // when users logs in 
  // setting the user
  setUser(user: any) {
    this.userSubject.next(user); // Update the current user data
  }
}
