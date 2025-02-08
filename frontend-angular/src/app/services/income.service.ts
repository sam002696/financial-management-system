import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addIncome, IApiResponseIncome } from '../model/income/income';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';  // Import UrlBuilderService

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  createNewIncome(obj: addIncome): Observable<IApiResponseIncome> {
    const url = this.urlBuilder.buildUrl('financial-activities/income/create');
    return this.http.post<IApiResponseIncome>(url, obj);
  }

  getIncomeList(page: number = 1, size: number = 10): Observable<IApiResponseIncome> {
    const url = this.urlBuilder.buildUrl(`financial-activities/income/list?page=${page}&size=${size}`);
    return this.http.get<IApiResponseIncome>(url);
  }

  getSingleIncome(id: number): Observable<IApiResponseIncome> {
    const url = this.urlBuilder.buildUrl(`financial-activities/income/${id}`);
    return this.http.get<IApiResponseIncome>(url);
  }

  updateIncome(id: number, obj: addIncome): Observable<IApiResponseIncome> {
    const url = this.urlBuilder.buildUrl(`financial-activities/income/update/${id}`);
    return this.http.put<IApiResponseIncome>(url, obj);
  }

  deleteIncome(id: number): Observable<IApiResponseIncome> {
    const url = this.urlBuilder.buildUrl(`financial-activities/income/delete/${id}`);
    return this.http.delete<IApiResponseIncome>(url);
  }
}
