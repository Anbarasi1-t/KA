import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approve-amount-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approve-amount-popup.component.html',
  styleUrls: ['./approve-amount-popup.component.scss']
})
export class ApproveAmountPopupComponent {
  amount: number | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() approve = new EventEmitter<number>();

  onClose() {
    this.close.emit();
  }

  onApprove() {
    if (this.amount && this.amount > 0) {
      this.approve.emit(this.amount);
      this.onClose();
    } else {
      alert('Please enter a valid amount');
    }
  }
}
