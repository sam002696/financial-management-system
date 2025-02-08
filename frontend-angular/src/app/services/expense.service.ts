import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addExpense } from '../model/expense/expense';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { UrlBuilderService } from './url-builder.service';  // Import the UrlBuilderService

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  createNewExpense(obj: addExpense): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('financial-activities/expense/create');
    return this.http.post<IApiResponse>(url, obj);
  }


  getExpenseList(page: number = 1, size: number = 10): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/expense/list?page=${page}&size=${size}`);
    return this.http.get<IApiResponse>(url);
  }

  getSingleExpense(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/expense/${id}`);
    return this.http.get<IApiResponse>(url);
  }

  updateExpense(id: number, obj: addExpense): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/expense/update/${id}`);
    return this.http.put<IApiResponse>(url, obj);
  }

  deleteExpense(id: number): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl(`financial-activities/expense/delete/${id}`);
    return this.http.delete<IApiResponse>(url);
  }
}
