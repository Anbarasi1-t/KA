import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../../components/menubar/menubar.component';
import { ReferralTableComponent } from '../../components/referral-table/referral-table.component';
import { SummaryConsComponent } from '../../components/summary-cons/summary-cons.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TabSwitcherComponent } from '../../components/tab-switcher';
import { ContributionFilterComponent, ContributionFilters } from '../../components/contribution-filter/contribution-filter.component';
import { ContributionTableComponent, ContributionRow } from '../../components/contribution-table/contribution-table.component';
import { RequestService } from '../../services/requests.service';
import { UserService, UserProfile } from '../../services/user.service';
import { NoContributionComponent } from '../../components/no-contribution/no-contribution.component';

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
    ContributionTableComponent,
    NoContributionComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  searchTerm: string = '';
  selectedTab: 'contribution' | 'referrals' = 'contribution';

  showFilters = false;
  contributionFilters: ContributionFilters | null = null;
  filteredCount: number = 0;
  contributionRows: ContributionRow[] = [];
  userProfile: UserProfile | null = null;

  filterActive = false;

  constructor(private requestService: RequestService, private userService: UserService) {
    this.loadContributions();
    this.loadUserProfile();
  }

  onFilterToggle() {
    this.filterActive = !this.filterActive;
    if (this.selectedTab === 'contribution') {
      this.showFilters = !this.showFilters;
      this.updateFilteredCount();
    }
  }

  onContributionFiltersChange(f: ContributionFilters) {
    this.contributionFilters = { ...f };
    this.updateFilteredCount();
  }

  onTabChange(tab: 'contribution' | 'referrals') {
    this.selectedTab = tab;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
  }

  private updateFilteredCount() {
    const f = this.contributionFilters || { year: null, month: null } as any;
    this.filteredCount = this.contributionRows.filter(r =>
      (!f.year || r.fy === f.year) && (!f.month || r.month === f.month)
    ).length;
  }

  private loadContributions() {
    this.requestService.getContributions().subscribe((rows: any[]) => {
      // Map backend fields directly as ContributionRow
      this.contributionRows = rows as ContributionRow[];
      this.updateFilteredCount();
    });
  }

  private loadUserProfile() {
    this.userService.getUserProfile().subscribe((profile: UserProfile) => {
      this.userProfile = profile;
    });
  }

  // Keep right column from exceeding left column height
  @ViewChild('leftCol', { static: true }) leftCol!: ElementRef<HTMLDivElement>;
  @ViewChild('rightCol', { static: true }) rightCol!: ElementRef<HTMLDivElement>;
  private leftResizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.syncRightHeight();
    // Observe changes in left column size (e.g., image load, responsive changes)
    if ('ResizeObserver' in window) {
      this.leftResizeObserver = new ResizeObserver(() => this.syncRightHeight());
      this.leftResizeObserver.observe(this.leftCol.nativeElement);
    } else {
      // Fallback: re-sync after a short delay for assets like images
      setTimeout(() => this.syncRightHeight(), 300);
    }
  }

  @HostListener('window:resize') onResize() {
    this.syncRightHeight();
  }

  private syncRightHeight() {
    const leftHeight = this.leftCol?.nativeElement.getBoundingClientRect().height || 0;
    if (leftHeight > 0) {
      const right = this.rightCol.nativeElement;
      right.style.maxHeight = leftHeight + 'px';
      right.style.overflow = 'auto';
    }
  }

  ngOnDestroy(): void {
    if (this.leftResizeObserver) {
      this.leftResizeObserver.disconnect();
    }
  }
}
