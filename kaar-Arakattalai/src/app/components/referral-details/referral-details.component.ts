import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss']
})
export class ReferralDetailsComponent {
  @Input() referral: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
