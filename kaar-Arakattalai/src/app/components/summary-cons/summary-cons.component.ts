import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/requests.service';

@Component({
  standalone: true,
  selector: 'app-summary-cons',
  imports: [CommonModule],
  template: `
    <div class="summary-cons-wrapper">
      <div class="summary-container">
        <div
          class="summary-box"
          *ngFor="let item of statusSummary"
          [ngStyle]="getStyle(item.status)"
        >
          <div class="label">{{ item.label }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .summary-cons-wrapper {
      width: auto;
      padding: 0;
      box-sizing: border-box;
      margin-top: 0;
      margin-bottom: 0;
    }

    .summary-container {
      display: flex;
      flex-wrap: nowrap;
      gap: 1rem;
      align-items: center;
    }

    .summary-box {
      flex: 0 1 130px;
      display: flex;
      justify-content: space-between;
      align-items: left;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      border-left: 6px solid;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      min-width: 120px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .summary-box:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      background-color: #f3f3f3;
    }

    .label {
      flex: 1;
    }

    .count {
      font-weight: bold;
      padding-left: 0.5rem;
    }
  `]
})
export class SummaryConsComponent implements OnInit {
  statusSummary = [
    { status: 'all', label: 'All', count: 0 },
    { status: 'approved', label: 'Approved', count: 0 },
    { status: 'inprogress', label: 'InProgress', count: 0 },
    { status: 'rejected', label: 'Rejected', count: 0 },
  ];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadSummaryData();
  }

  loadSummaryData(): void {
    this.requestService.getAllCount().subscribe((count: number) => {
      this.updateCount('all', count);
    });

    this.requestService.getApprovedCount().subscribe((count: number) => {
      this.updateCount('approved', count);
    });

    this.requestService.getInProgressCount().subscribe((count: number) => {
      this.updateCount('inprogress', count);
    });

    this.requestService.getRejectedCount().subscribe((count: number) => {
      this.updateCount('rejected', count);
    });
  }

  updateCount(status: string, count: number): void {
    const item = this.statusSummary.find(s => s.status === status);
    if (item) {
      item.count = count;
    }
  }

  getStyle(status: string): { [key: string]: string } {
    const styles: { [key: string]: { [key: string]: string } } = {
      all: {
        borderLeftColor: '#e03b58',
        color: '#515965'
      },
      approved: {
        borderLeftColor: '#4caf50',
        color: '#515965'
      },
      inprogress: {
        borderLeftColor: '#ff9800',
        color: '#515965'
      },
      rejected: {
        borderLeftColor: '#f44336',
        color: '#515965'
      }
    };
    return styles[status.toLowerCase()] || {};
  }
}
