import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../model/contract/contract';
import { UserContractService } from '../../../services/user-contract.service';
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-expense-modal',
  imports: [CommonModule],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.css'
})
export class ExpenseModalComponent {
  @Input() expenseId: number | null = null; // expenseId  received from the parent
  @Output() closeModal = new EventEmitter<void>(); // Event to close modal

  contractData: Contract | null = null; // Data of the contract
  visible: boolean = false; // Modal visibility

  constructor(private contractService: UserContractService,
    private globalAlertService: GlobalAlertService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseId'] && this.expenseId) {
      this.fetchContractData(this.expenseId); // Fetching data when expenseId changes
    }
  }

  // Fetching contract data for the selected expense
  fetchContractData(expenseId: number) {
    this.contractService.getSingleExpenseContract(expenseId).subscribe(response => {
      if (response.status === 'success') {
        this.contractData = response.data; // Setting the contract data
        this.visible = true; // Showing the modal
      }
    }, error => {
      this.contractData = null;
      this.globalAlertService.showAlert(error.error.message, 'error');
    });
  }

  // Close the modal
  close() {
    this.visible = false;
    this.contractData = null;
    this.closeModal.emit();  // Emitting event to close modal in the parent component
  }
}
