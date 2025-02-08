import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIncome, IApiResponseIncome } from '../../../model/income/income';
import { IncomeService } from '../../../services/income.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-add-income',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css'
})
export class AddIncomeComponent {

  constructor(
    private router: Router,
    private incomeService: IncomeService,
    private globalAlertService: GlobalAlertService // Injecting the global alert service
  ) { }

  // Model for the form
  addIncome: addIncome = new addIncome();

  // Form submission handler
  onSubmit() {
    console.log('Form Submitted', this.addIncome);
    const incomeData = { ...this.addIncome };
    delete incomeData.id;

    this.incomeService.createNewIncome(incomeData).subscribe((res: IApiResponseIncome) => {
      console.log('Response', res);
      if (res.status === 'success') {
        this.globalAlertService.showAlert(res.message, 'success');
        this.router.navigate(['/income/list']);
      }
    }, error => {
      this.globalAlertService.showAlert(error.error.message, 'error');
    });
  }

}
