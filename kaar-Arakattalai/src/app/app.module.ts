// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
// import { DashboardComponent} from './pages/dashboard/dashboard.component';
// import { ReferralDashboardComponent } from './pages/referral-dashboard/referral-dashboard.component';
// import { TopBarComponent } from './components/top-bar/top-bar.component';
// import { TabFilterComponent } from './components/tab-filter/tab-filter.component';
// import { ReferralTableNewComponent } from './components/referral-table-new/referral-table-new.component';
// import { ColumnsToggleComponent } from './components/columns-toggle/columns-toggle.component';

// const routes = [
//   { path: '', component: DashboardComponent },
//   { path: 'referral-dashboard', component: ReferralDashboardComponent }
// ];

// @NgModule({
//   declarations: [
//     AppComponent,
//     DashboardComponent,
//     TopBarComponent,
//     TabFilterComponent,
//     ReferralTableNewComponent,
//     ColumnsToggleComponent
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot(routes),
//     ReferralDashboardComponent
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class AppModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReferralDashboardComponent } from './pages/referral-dashboard/referral-dashboard.component';
import { AdminLandingPageComponent } from './pages/adminlandingpage/adminlandingpage.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TabFilterComponent } from './components/tab-filter/tab-filter.component';
import { ReferralTableNewComponent } from './components/referral-table-new/referral-table-new.component';
import { ColumnsToggleComponent } from './components/columns-toggle/columns-toggle.component';

const routes = [
  { path: '', component: DashboardComponent },
  { path: 'referral-dashboard', component: ReferralDashboardComponent },
  { path: 'admin-landing', component: AdminLandingPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopBarComponent,
    TabFilterComponent,
    ReferralTableNewComponent,
    ColumnsToggleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReferralDashboardComponent,
    AdminLandingPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
