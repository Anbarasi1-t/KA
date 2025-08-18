import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ViewEncapsulation } from '@angular/core';
import { ContributionFilters } from '../contribution-filter/contribution-filter.component';

export interface ContributionRow {
  fy: string;
  month: string;
  amount: number;
  transferType: string;
}

@Component({
  standalone: true,
  selector: 'app-contribution-table',
  imports: [CommonModule, AgGridModule],
  templateUrl: './contribution-table.component.html',
  styleUrls: ['./contribution-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContributionTableComponent implements OnChanges {
  @Input() rows: ContributionRow[] = [];
  @Input() filters: ContributionFilters | null = null;

  filteredRows: ContributionRow[] = [];

  columnDefs: ColDef[] = [
    { field: 'fy', headerName: 'FY', flex: 1 },
    { field: 'month', headerName: 'Month', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1, valueFormatter: params => params.value.toLocaleString() },
    { field: 'transferType', headerName: 'Transfer Type', flex: 1 },
  ];

  defaultColDef: ColDef = {
    resizable: false,
    sortable: false,
    filter: false,
    cellStyle: { padding: '10px 12px', color: '#515965', fontSize: '14px' }
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

private applyFilters() {
  const year = this.filters?.year ?? null;
  const month = this.filters?.month ?? null;
  const type = this.filters?.type ?? null;
  this.filteredRows = this.rows.filter(r =>
    (!year || r.fy === year) &&
    (!month || r.month === month) &&
    (!type || r.transferType === type)
  );
}

}
