import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ContributionFilters {
  year: string | null;
  month: string | null;
}

@Component({
  standalone: true,
  selector: 'app-contribution-filter',
  imports: [CommonModule],
  templateUrl: './contribution-filter.component.html',
  styleUrls: ['./contribution-filter.component.scss']
})
export class ContributionFilterComponent {
  years: string[] = ['2022', '2023', '2024', '2025'];
  months: string[] = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];

  selected: ContributionFilters = {
    year: null,
    month: null,
  };

  @Output() filtersChange = new EventEmitter<ContributionFilters>();

  selectYear(y: string) {
    this.selected.year = y;
    this.emit();
  }
  selectMonth(m: string) {
    this.selected.month = m;
    this.emit();
  }

  clearYear() {
    this.selected.year = null;
    this.emit();
  }

  clearMonth() {
    this.selected.month = null;
    this.emit();
  }

  private emit() {
    this.filtersChange.emit({ ...this.selected });
  }
}
