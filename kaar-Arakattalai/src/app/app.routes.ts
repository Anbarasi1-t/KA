import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReferralDashboardComponent } from './pages/referral-dashboard/referral-dashboard.component';
import { AdminLandingPageComponent } from './pages/adminlandingpage/adminlandingpage.component';

export const appRoutes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'referral-dashboard', component: ReferralDashboardComponent },
  { path: 'admin-landing', component: AdminLandingPageComponent } // Optional, for direct navigation
];
