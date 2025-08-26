import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReferralDashboardComponent } from './pages/referral-dashboard/referral-dashboard.component';
import { AdminLandingPageComponent } from './pages/adminlandingpage/adminlandingpage.component';
import { TreasuryPageComponent } from './pages/treasurypage/treasurypage.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DashboardComponent,
    ReferralDashboardComponent,
    AdminLandingPageComponent,
    RouterOutlet,
    TreasuryPageComponent,  // ✅ Add this
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
