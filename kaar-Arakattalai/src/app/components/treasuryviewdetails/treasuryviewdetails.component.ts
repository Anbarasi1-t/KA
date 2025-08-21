import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treasury-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treasury-view-details.component.html',
  styleUrls: ['./treasury-view-details.component.scss']
})
export class TreasuryViewDetailsComponent {
  @Input() treasury: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
