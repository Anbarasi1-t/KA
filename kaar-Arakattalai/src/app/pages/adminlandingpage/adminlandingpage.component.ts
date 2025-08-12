import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../../components/menubar/menubar.component';
import { SummarycardsAdminComponent } from '../../components/summarycards-admin/summarycards-admin.component';
import { AdminTableComponent } from '../../components/admintable/admintable.component';

@Component({
  selector: 'app-adminlandingpage',
  standalone: true,
  imports: [
    CommonModule,
    MenubarComponent,
    SummarycardsAdminComponent,
    AdminTableComponent
  ],
  templateUrl: './adminlandingpage.component.html',
  styleUrls: ['./adminlandingpage.component.scss']
})
export class AdminLandingPageComponent {
  searchTerm = '';
  tableFilters: any = {};

  onSearchChange(value: string) {
    this.searchTerm = value;
  }

  onFilterToggle() {
    // toggle logic here
  }
}
