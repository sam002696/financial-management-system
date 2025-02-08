import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Contract } from '../../../model/contract/contract';
import { UserContractService } from '../../../services/user-contract.service';
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-loan-modal',
  imports: [CommonModule],
  templateUrl: './loan-modal.component.html',
  styleUrl: './loan-modal.component.css'
})
export class LoanModalComponent {
  @Input() loanId: number | null = null; // expenseId  received from the parent
  @Output() closeModal = new EventEmitter<void>(); // Event to close modal

  contractData: Contract | null = null; // Data of the contract
  visible: boolean = false; // Modal visibility

  constructor(private contractService: UserContractService,
    private globalAlertService: GlobalAlertService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loanId'] && this.loanId) {
      this.fetchContractData(this.loanId); // Fetching data when expenseId changes
    }
  }

  // Fetching contract data for the selected expense
  fetchContractData(loanId: number) {
    this.contractService.getSingleLoanContract(loanId).subscribe(response => {
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
