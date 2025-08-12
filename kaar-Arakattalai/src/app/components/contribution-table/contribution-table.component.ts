import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionFilters } from '../contribution-filter/contribution-filter.component';

export interface ContributionRow {
  fy: string; // e.g., 'FY 26'
  month: string; // e.g., 'March'
  amount: number; // e.g., 1000
  transferType: string; // e.g., 'Bank Transfer' | 'Salary'
}

@Component({
  standalone: true,
  selector: 'app-contribution-table',
  imports: [CommonModule],
  templateUrl: './contribution-table.component.html',
  styleUrls: ['./contribution-table.component.scss']
})
export class ContributionTableComponent implements OnChanges {
  @Input() rows: ContributionRow[] = [];
  @Input() filters: ContributionFilters | null = null;

  filteredRows: ContributionRow[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  private applyFilters() {
    const f = this.filters || { year: null, month: null, type: null };
    this.filteredRows = this.rows.filter(r =>
      (!f.year || r.fy === f.year) &&
      (!f.month || r.month === f.month) &&
      (!f.type || r.transferType === f.type)
    );
  }
}

