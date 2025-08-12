import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, ClientSideRowModelModule, TextFilterModule, NumberFilterModule, DateFilterModule } from 'ag-grid-community';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

@Component({
  selector: 'app-top-contributions',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './top-contributions.component.html',
  styleUrls: ['./top-contributions.component.scss']
})
export class TopContributionsComponent {
  columnDefs: ColDef[] = [
  { headerName: 'Rank', field: 'rank', sortable: true, filter: 'agNumberColumnFilter' },
  { headerName: 'Employee Name', field: 'employeeName', sortable: true, filter: 'agTextColumnFilter' },
  { headerName: 'Monthly Contribution', field: 'monthlyContribution', sortable: true, filter: 'agNumberColumnFilter' },
  { headerName: 'Total Contribution', field: 'totalContribution', sortable: true, filter: 'agNumberColumnFilter' }
];

rowData = [
  { rank: 1, employeeName: 'Alice', monthlyContribution: 5000, totalContribution: 25000 },
  { rank: 2, employeeName: 'Bob', monthlyContribution: 4000, totalContribution: 20000 },
  { rank: 3, employeeName: 'Charlie', monthlyContribution: 3000, totalContribution: 18000 }
];
}

