import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../../components/menubar/menubar.component';
import { ReferralTableComponent } from '../../components/referral-table/referral-table.component';
import { SummaryConsComponent } from '../../components/summary-cons/summary-cons.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TabSwitcherComponent } from '../../components/tab-switcher';
import { ContributionFilterComponent, ContributionFilters } from '../../components/contribution-filter/contribution-filter.component';
import { ContributionTableComponent, ContributionRow } from '../../components/contribution-table/contribution-table.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MenubarComponent,
    SummaryConsComponent,
    ReferralTableComponent,
    UserProfileComponent,
    TabSwitcherComponent,
    ContributionFilterComponent,
    ContributionTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchTerm: string = '';
  selectedTab: 'contribution' | 'referrals' = 'contribution';

  showFilters = false;
  contributionFilters: ContributionFilters | null = null;
  contributionRows: ContributionRow[] = [
    { fy: 'FY 26', month: 'March', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'April', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'May', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'June', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'July', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'August', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'September', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'October', amount: 1000, transferType: 'Bank Transfer' },
    { fy: 'FY 26', month: 'November', amount: 1000, transferType: 'Bank Transfer' }
  ];

  onFilterToggle() {
    if (this.selectedTab === 'contribution') {
      this.showFilters = !this.showFilters;
    }
  }

  onContributionFiltersChange(f: ContributionFilters) {
    this.contributionFilters = { ...f };
  }

  onTabChange(tab: 'contribution' | 'referrals') {
    this.selectedTab = tab;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
  }
}
