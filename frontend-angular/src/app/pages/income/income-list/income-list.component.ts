import { GetIncome } from './../../../model/income/income';
import { Component, inject, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IApiResponseIncome } from '../../../model/income/income';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PaginationComponent } from "../../pagination/pagination.component";
import { IncomeModalComponent } from "../../modal/income-modal/income-modal.component";
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-income-list',
  imports: [CommonModule, RouterLink, PaginationComponent, IncomeModalComponent],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.css'
})
export class IncomeListComponent implements OnInit {

  selectedIncomeId: number | null = null;

  meta: any = {};

  constructor(private router: Router) { }

  incomeList: GetIncome[] = []

  incomeService = inject(IncomeService);
  globalAlertService = inject(GlobalAlertService)

  ngOnInit(): void {
    this.loadIncomes(1, 10);  // Defaulting to page 1 and size 10 items per page
  }

  // Load incomes with pagination
  loadIncomes(page: number, size: number): void {
    this.incomeService.getIncomeList(page, size).subscribe((res: IApiResponseIncome) => {
      if (res.status === 'success') {
        this.incomeList = res.data;
        this.meta = res.meta;
        // Calculating total pages 
        if (this.meta.total && this.meta.size) {
          this.meta.totalPages = Math.ceil(this.meta.total / this.meta.size);
        }
      }
    });
  }

  // Handling page change from pagination component
  onPageChange(page: number): void {

    if (page > 0 && page <= this.meta.totalPages) {
      this.loadIncomes(page, this.meta.size);  // Fetching the loans for the selected page
    }
  }


  // Method to handle income deletion
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this income record?')) {
      this.incomeService.deleteIncome(id).subscribe((res: IApiResponseIncome) => {
        if (res.status === 'success') {
          this.globalAlertService.showAlert(res.message, 'success');
          this.incomeList = this.incomeList.filter(income => income.id !== id);
        }
      }, error => {
        this.globalAlertService.showAlert(error.error.message, 'error');
      });
    }
  }


  onViewContract(incomeId: number) {
    this.selectedIncomeId = incomeId;
  }




  handleIncome() {
    this.router.navigate(['/income/log']);
  }

  // Closing the modal
  closeModal() {
    this.selectedIncomeId = null;
  }

}
