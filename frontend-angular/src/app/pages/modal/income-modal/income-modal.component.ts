import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { UserContractService } from '../../../services/user-contract.service';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../model/contract/contract';

@Component({
  selector: 'app-income-modal',
  imports: [CommonModule],
  templateUrl: './income-modal.component.html',
  styleUrl: './income-modal.component.css'
})
export class IncomeModalComponent {
  @Input() incomeId: number | null = null; // Income ID received from the parent
  @Output() closeModal = new EventEmitter<void>(); // Event to close modal

  contractData: Contract | null = null; // Data of the contract
  visible: boolean = false; // Modal visibility

  constructor(private contractService: UserContractService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['incomeId'] && this.incomeId) {
      this.fetchContractData(this.incomeId); // Fetching data when incomeId changes
    }
  }

  // Fetch contract data for the selected income
  fetchContractData(incomeId: number) {
    this.contractService.getSingleIncomeContract(incomeId).subscribe(response => {
      if (response.status === 'success') {
        this.contractData = response.data; // Setting the contract data
        this.visible = true; // Showing the modal
      }
    });
  }

  // Closing the modal
  close() {
    this.visible = false;
    this.closeModal.emit();  // Emitting event to close modal in the parent component
  }
}
