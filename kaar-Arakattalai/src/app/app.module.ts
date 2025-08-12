import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { MyReferralsComponent } from './pages/my-referrals/my-referrals.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyReferralsComponent,
  ],
  imports: [
    BrowserModule,
    appRoutes  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }