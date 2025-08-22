import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treasuryviewdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treasuryviewdetails.component.html',
  styleUrls: ['./treasuryviewdetails.component.scss']
})
export class TreasuryViewDetailsComponent {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
