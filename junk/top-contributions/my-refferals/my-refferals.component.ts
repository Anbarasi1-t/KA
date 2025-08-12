import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-my-refferals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="pill" [ngClass]="cssClass">{{ value }}</span>
  `,
  styles: [`
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
    }

    .approved {
      background-color: #e9f9ee;
      color: #16a34a;
    }

    .rejected {
      background-color: #fdecec;
      color: #dc2626;
    }

    .pending {
      background-color: #fef9e7;
      color: #d97706;
    }
  `]
})
export class MyRefferalsComponent implements ICellRendererAngularComp {
  value = '';
  cssClass = 'pending';

  agInit(params: any): void {
    this.value = params.value;
    const val = this.value?.toLowerCase();
    this.cssClass =
      val === 'approved' ? 'approved' :
      val === 'rejected' ? 'rejected' :
      'pending';
  }

  refresh(): boolean {
    return false;
  }
}
