import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { UrlBuilderService } from './url-builder.service';
import { addLoan } from '../model/loan/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  createNewLoan(obj: addLoan): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('financial-activities/loan/create');
    return this.http.post<IApiResponse>(url, obj);
  }

  getLoanList(page: number = 1, size: number = 10): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/loan/list?page=${page}&size=${size}`);
    return this.http.get<IApiResponse>(url);
  }

  getSingleLoan(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/loan/${id}`);
    return this.http.get<IApiResponse>(url);
  }

  updateLoan(id: number, obj: addLoan): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/loan/update/${id}`);
    return this.http.put<IApiResponse>(url, obj);
  }

  deleteLoan(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/loan/delete/${id}`);
    return this.http.delete<IApiResponse>(url);
  }

  repayLoan(id: number, amount: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/loan/repay/${id}`);
    return this.http.put<IApiResponse>(`${url}?amount=${amount}`, {});
  }
}
