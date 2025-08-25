import { Component } from '@angular/core';

@Component({
  selector: 'app-treasury-action-popup',
  standalone: true,
  templateUrl: './treasuryaction.component.html',
  styleUrls: ['./treasuryaction.component.scss']
})
export class TreasuryActionPopupComponent {
  isOpen = true;

  closePopup() {
    this.isOpen = false;
  }
}
