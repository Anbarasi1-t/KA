import { Component } from '@angular/core';

import { TabFilterComponent } from '../../components/tab-filter/tab-filter.component';
import { ReferralTableNewComponent } from '../../components/referral-table-new/referral-table-new.component';
import { ColumnsToggleComponent } from '../../components/columns-toggle/columns-toggle.component';
import { MenubarComponent } from '../../components/menubar/menubar.component';

@Component({
  selector: 'app-referral-dashboard',
  standalone: true,
  imports: [MenubarComponent, TabFilterComponent, ReferralTableNewComponent, ColumnsToggleComponent],
  templateUrl: './referral-dashboard.component.html',
  styleUrls: ['./referral-dashboard.component.scss']
})
export class ReferralDashboardComponent {}
