// src/app/components/summarycards-admin/summarycards-admin.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { HttpClientModule } from '@angular/common/http';

interface SummaryCard {
  key: string;
  label: string;
  count: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-summarycards-admin',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './summarycards-admin.component.html',
  styleUrls: ['./summarycards-admin.component.scss'],
  // AdminService providedIn: 'root' already, no need to add providers here
})
export class SummarycardsAdminComponent implements OnInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;

  hoverKey = '';
  summaryCards: SummaryCard[] = [
    { key: 'requests', label: 'Requests', count: 0, color: '#ff5722' },
    { key: 'approvals', label: 'Approvals', count: 0, color: '#4caf50' },
    { key: 'rejected', label: 'Rejected', count: 0, color: '#f44336' },
    { key: 'scholarship-form', label: 'Scholarship Form', count: 0, color: '#03a9f4' },
    { key: 'assistance-ngo', label: 'Assistance to NGO', count: 0, color: '#9c27b0' },
    { key: 'medical-assistance', label: 'Medical Assistance', count: 0, color: '#e91e63' },
    { key: 'laptop-request', label: 'Laptop Request', count: 0, color: '#795548' },
    { key: 'csr-advances', label: 'CSR – Advances & Expenses', count: 0, color: '#607d8b' }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    // Each call typed properly to avoid implicit any
    this.adminService.getRequestsCount().subscribe((count: number) => this.setCount('requests', count), (err) => this.handleError('requests', err));
    this.adminService.getApprovalsCount().subscribe((count: number) => this.setCount('approvals', count), (err) => this.handleError('approvals', err));
    this.adminService.getRejectedCount().subscribe((count: number) => this.setCount('rejected', count), (err) => this.handleError('rejected', err));
    this.adminService.getScholarshipFormCount().subscribe((count: number) => this.setCount('scholarship-form', count), (err) => this.handleError('scholarship-form', err));
    this.adminService.getAssistanceNgoCount().subscribe((count: number) => this.setCount('assistance-ngo', count), (err) => this.handleError('assistance-ngo', err));
    this.adminService.getMedicalAssistanceCount().subscribe((count: number) => this.setCount('medical-assistance', count), (err) => this.handleError('medical-assistance', err));
    this.adminService.getLaptopRequestCount().subscribe((count: number) => this.setCount('laptop-request', count), (err) => this.handleError('laptop-request', err));
    this.adminService.getCsrAdvancesCount().subscribe((count: number) => this.setCount('csr-advances', count), (err) => this.handleError('csr-advances', err));
  }

  setCount(key: string, value: number): void {
    const item = this.summaryCards.find(i => i.key === key);
    if (item) {
      item.count = value;
    }
  }

  handleError(key: string, error: any): void {
    console.error(`Error loading ${key} count:`, error);
    // keep count as 0 or set to -1 to indicate failure as you prefer
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
}
