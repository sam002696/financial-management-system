import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from './url-builder.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }


  getDashboardData(): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`dashboard/user`);
    return this.http.get<IApiResponse>(url);
  }


}
