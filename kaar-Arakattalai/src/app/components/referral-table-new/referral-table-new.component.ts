import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular, AgGridModule,  } from 'ag-grid-angular';
import { ModuleRegistry } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { RowSelectionModule } from 'ag-grid-community';
import { RequestService } from '../../services/requests.service';
 
 
ModuleRegistry.registerModules([RowSelectionModule]);
 
interface Referral {
  id: number;
  employeeName: string;
  employeeAID: string;
  referralType: string;
  annualContribution: number;
  amountRequested: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  submissionDate: string;
  beneficiaryName?: string;
}
 
@Component({
  selector: 'app-referral-table-new',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './referral-table-new.component.html',
  styleUrls: ['./referral-table-new.component.scss']
})
export class ReferralTableNewComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Output() referralSelected = new EventEmitter<Referral>();
 
  referrals: Referral[] = [];
  filteredReferrals: Referral[] = [];
  loading: boolean = true;
  error: string | null = null;
 
  colDefs: ColDef[] = [
    { headerName: 'S. No.', valueGetter: 'node.rowIndex + 1', width: 90 },
    {
      headerName: 'Employee Name',
      field: 'employeeName',
      flex: 1,
      cellRenderer: (params: any) => `
        <img src="assets/profile_picture.png" class="avatar"/>
        ${params.value || ''}
      `
    },
    { headerName: 'Employee AID', field: 'employeeAID', flex: 1 },
    { headerName: 'Referral Type', field: 'referralType', flex: 1 },
    {
      headerName: 'Annual Contribution',
      field: 'annualContribution',
      flex: 1,
      valueFormatter: (p) => this.formatCurrency(p.value)
    },
    {
      headerName: 'Amount Requested',
      field: 'amountRequested',
      flex: 1,
      valueFormatter: (p) => this.formatCurrency(p.value)
    },
    {
  headerName: 'Actions',
  cellRenderer: () => `
    <button class="edit-button" aria-label="Edit">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    </button>
  `,
  width: 100
}
 
  ];
 
  defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    resizable: false,
  };
 
  constructor(private requestService: RequestService) {}
 
  ngOnInit(): void {
    this.loadReferrals();
  }
 
  loadReferrals(): void {
    this.loading = true;
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.referrals = data.map(item => ({
          id: item.id || item._id,
          employeeName: item.employeeName || 'N/A',
          employeeAID: item.employeeAID || 'N/A',
          referralType: item.referralType || 'N/A',
          annualContribution: Number(item.annualContribution) || 0,
          amountRequested: Number(item.amountRequested) || 0,
          status: item.status || 'Pending',
          submissionDate: item.submissionDate || new Date().toISOString(),
          beneficiaryName: item.beneficiaryName || item.beneficiaryName
        }));
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load referrals';
        this.loading = false;
      }
    });
  }
 
  applyFilters(): void {
    if (!this.searchTerm) {
      this.filteredReferrals = this.referrals;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredReferrals = this.referrals.filter(referral =>
      referral.employeeName.toLowerCase().includes(term) ||
      referral.employeeAID.toLowerCase().includes(term) ||
      referral.referralType.toLowerCase().includes(term)
    );
  }
 
  onReferralSelect(referral: Referral): void {
    this.referralSelected.emit(referral);
  }
 
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
}
 