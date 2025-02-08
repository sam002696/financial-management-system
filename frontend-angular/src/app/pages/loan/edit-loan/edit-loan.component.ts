import { LoanService } from './../../../services/loan.service';
import { Component, OnInit } from '@angular/core';
import { addLoan, GetLoan } from '../../../model/loan/loan';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-edit-loan',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-loan.component.html',
  styleUrl: './edit-loan.component.css'
})
export class EditLoanComponent implements OnInit {
  // This will hold the data for the form
  addLoan: addLoan = new addLoan();

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute, // to get the id from the route
    private router: Router, // for navigating after successful update
    private globalAlertService: GlobalAlertService
  ) { }

  ngOnInit(): void {

    const loanId = Number(this.route.snapshot.paramMap.get('id'));

    if (loanId) {

      this.loanService.getSingleLoan(loanId).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          this.addLoan = res.data;
        }
      });
    }
  }

  //Method to handle form submission
  onSubmit(): void {

    console.log(this.addLoan);
    const id = this.addLoan.id || 0
    const loanData = { ...this.addLoan };
    delete loanData.id;
    delete loanData.userId;
    delete loanData.status;
    delete loanData.paidAmount;
    delete loanData.remainingAmount;


    this.loanService.updateLoan(id, loanData).subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        this.globalAlertService.showAlert(res.message, 'success');
        this.router.navigate(['/loan/list']);
      }
    }, error => {
      this.globalAlertService.showAlert(error.error.message, 'error');
    });
  }
}
