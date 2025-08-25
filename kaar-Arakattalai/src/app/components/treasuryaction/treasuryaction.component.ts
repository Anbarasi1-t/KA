// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-treasury-action',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './treasuryaction.component.html',
//   styleUrls: ['./treasuryaction.component.scss']
// })
// export class TreasuryActionComponent {
//   @Input() treasury: any;   // Accepts row data
//   @Output() close = new EventEmitter<void>();

//   isOpen = true;

//   closePopup() {
//     this.isOpen = false;
//     this.close.emit();
//   }
// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treasuryaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treasuryaction.component.html',
  styleUrls: ['./treasuryaction.component.scss']
})
export class TreasuryActionComponent {
  @Input() data: any;   // <-- FIXED name
  @Output() close = new EventEmitter<void>();

  isOpen = true;

  closePopup() {
    this.isOpen = false;
    this.close.emit();
  }
}
