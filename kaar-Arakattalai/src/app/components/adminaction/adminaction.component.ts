import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-action',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminaction.component.html',
  styleUrls: ['./adminaction.component.scss']
})
export class AdminActionComponent {
  @Input() data: any;  // 👈 receive selected row data
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
