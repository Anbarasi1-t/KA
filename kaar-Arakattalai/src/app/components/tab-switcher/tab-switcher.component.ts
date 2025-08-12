import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tab-switcher',
  templateUrl: './tab-switcher.component.html',
  styleUrls: ['./tab-switcher.component.scss']
})
export class TabSwitcherComponent {
  @Input() selectedTab: 'contribution' | 'referrals' = 'contribution';

  @Output() tabChange = new EventEmitter<'contribution' | 'referrals'>();

  selectTab(tab: 'contribution' | 'referrals') {
    this.selectedTab = tab;
    this.tabChange.emit(tab);
  }
}

