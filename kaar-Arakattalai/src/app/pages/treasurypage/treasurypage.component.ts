import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../../components/menubar/menubar.component';
import { ReferralTableNewComponent } from '../../components/referral-table-new/referral-table-new.component';
import { TreasurybarComponent } from '../../components/treasurybar/treasurybar.component'; // ✅ import treasurybar

@Component({
  selector: 'app-treasurypage',
  standalone: true,   // ✅ standalone component
  imports: [
    CommonModule,
    MenubarComponent,
    ReferralTableNewComponent,
    TreasurybarComponent   // ✅ added treasurybar here
  ],
  templateUrl: './treasurypage.component.html',
  styleUrls: ['./treasurypage.component.scss']
})
export class TreasuryPageComponent {
  searchTerm: string = '';

  onSearchChange(term: string) {
    this.searchTerm = term;
  }

  onFilterToggle() {}
    // add logic if you need filter toggling
  
}
