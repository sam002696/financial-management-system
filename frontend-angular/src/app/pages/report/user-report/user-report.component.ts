import { Component } from '@angular/core';

import { saveAs } from 'file-saver'; // You can use this to trigger the file download
import { UserReportService } from '../../../services/user-report.service';

@Component({
  selector: 'app-user-reports',
  imports: [],
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {

  constructor(private reportService: UserReportService) { }

  // Triggering Income and Expense Report download
  downloadIncomeExpenseReport(): void {
    this.reportService.downloadIncomeExpenseReport().subscribe(
      (response: Blob) => {
        const fileName = 'Income_Expense_Report.pdf';
        saveAs(response, fileName);
      },
      error => {
        console.error('Error downloading the Income and Expense Report', error);
      }
    );
  }

  // Trigger Loan Status Report download
  downloadLoanStatusReport(): void {
    this.reportService.downloadLoanStatusReport().subscribe(
      (response: Blob) => {
        const fileName = 'Loan_Status_Report.pdf';
        saveAs(response, fileName);
      },
      error => {
        console.error('Error downloading the Loan Status Report', error);
      }
    );
  }
}
