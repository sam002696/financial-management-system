import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import { addLoan } from '../../../model/loan/loan';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';
import { CommonModule } from '@angular/common';
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-add-loan',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {
  constructor(
    private router: Router,
    private globalAlertService: GlobalAlertService
  ) { }

  loanService = inject(LoanService);

  // Model for the form
  addLoan: addLoan = new addLoan();

  onSubmit() {
    console.log('Form Submitted', this.addLoan);
    const loanData = { ...this.addLoan };
    delete loanData.id;

    this.loanService.createNewLoan(loanData).subscribe((res: IApiResponse) => {
      console.log('Response', res);
      if (res.status === 'success') {
        this.globalAlertService.showAlert(res.message, 'success');
        this.router.navigate(['/loan/list']);
      }

    }, error => {
      this.globalAlertService.showAlert(error.error.message, 'error');
    });

  }
}
