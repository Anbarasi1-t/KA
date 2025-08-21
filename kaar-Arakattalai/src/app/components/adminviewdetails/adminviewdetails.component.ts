import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminviewdetails.component.html',
  styleUrls: ['./adminviewdetails.component.scss']
})
export class AdminViewDetailsComponent {
  @Input() data: any;  // 👈 receive selected row data
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
