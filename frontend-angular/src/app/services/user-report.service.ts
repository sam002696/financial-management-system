import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  // Helper method to download any report by passing the report endpoint
  private downloadReport(endpoint: string): Observable<Blob> {
    const url = this.urlBuilder.buildUrl(endpoint);
    return this.http.get(url, { responseType: 'blob' });
  }

  // Downloading Income and Expense Report
  downloadIncomeExpenseReport(): Observable<Blob> {
    return this.downloadReport('reports/income-expense');
  }

  // Downloading Loan Status Report
  downloadLoanStatusReport(): Observable<Blob> {
    return this.downloadReport('reports/loan-status');
  }
}
