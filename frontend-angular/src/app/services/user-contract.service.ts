import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from './url-builder.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class UserContractService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }


  getSingleLoanContract(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/contract/loan/${id}`);
    return this.http.get<IApiResponse>(url);
  }
  getSingleExpenseContract(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/contract/expense/${id}`);
    return this.http.get<IApiResponse>(url);
  }

  getSingleIncomeContract(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/contract/income/${id}`);
    return this.http.get<IApiResponse>(url);
  }


}
