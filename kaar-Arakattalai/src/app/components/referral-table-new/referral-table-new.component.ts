import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/requests.service';

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
  imports: [CommonModule],
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
      error: (error) => {
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

  ngOnChanges(): void {
    this.applyFilters();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN');
  }
}
