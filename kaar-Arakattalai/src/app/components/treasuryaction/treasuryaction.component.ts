import { Component } from '@angular/core';

@Component({
  selector: 'app-treasury-action-popup',
  standalone: true,
  templateUrl: './treasury-action-popup.component.html',
  styleUrls: ['./treasury-action-popup.component.scss']
})
export class TreasuryActionPopupComponent {
  isOpen = true;

  closePopup() {
    this.isOpen = false;
  }
}
