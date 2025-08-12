import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ContributionFilters {
  year: string | null;
  month: string | null;
  type: string | null;
}

@Component({
  standalone: true,
  selector: 'app-contribution-filter',
  imports: [CommonModule],
  templateUrl: './contribution-filter.component.html',
  styleUrls: ['./contribution-filter.component.scss']
})
export class ContributionFilterComponent {
  years: string[] = ['FY 25', 'FY 26', 'FY 27', 'FY 28'];
  months: string[] = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  types: string[] = ['Bank Transfer', 'Salary'];

  selected: ContributionFilters = {
    year: null,
    month: null,
    type: null
  };

  open = {
    year: false,
    month: false,
    type: false
  };

  @Output() filtersChange = new EventEmitter<ContributionFilters>();

  toggle(key: 'year' | 'month' | 'type') {
    // close others
    Object.keys(this.open).forEach(k => (this.open as any)[k] = false);
    this.open[key] = !this.open[key];
  }

  selectYear(y: string) {
    this.selected.year = y;
    this.open.year = false;
    this.emit();
  }
  selectMonth(m: string) {
    this.selected.month = m;
    this.open.month = false;
    this.emit();
  }
  selectType(t: string) {
    this.selected.type = t;
    this.open.type = false;
    this.emit();
  }

  private emit() {
    this.filtersChange.emit({ ...this.selected });
  }
}
