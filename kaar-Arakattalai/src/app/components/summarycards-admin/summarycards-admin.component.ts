import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/summarycards.service';

interface SummaryCard {
  key: string;
  label: string;
  count: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-summarycards-admin',
  imports: [CommonModule],
  templateUrl: './summarycards-admin.component.html',
  styleUrls: ['./summarycards-admin.component.scss'],
})
export class SummarycardsAdminComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;
  canScrollRight = false;
  canScrollLeft = false;
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

  ngAfterViewInit(): void {
    this.updateScrollButtons();
    this.scrollContainer.nativeElement.addEventListener('scroll', () => this.updateScrollButtons());
    window.addEventListener('resize', () => this.updateScrollButtons());
  }

  loadCounts(): void {
    this.adminService.getRequestsCount().subscribe(count => this.setCount('requests', count));
    this.adminService.getApprovalsCount().subscribe(count => this.setCount('approvals', count));
    this.adminService.getRejectedCount().subscribe(count => this.setCount('rejected', count));
    this.adminService.getScholarshipFormCount().subscribe(count => this.setCount('scholarship-form', count));
    this.adminService.getAssistanceNgoCount().subscribe(count => this.setCount('assistance-ngo', count));
    this.adminService.getMedicalAssistanceCount().subscribe(count => this.setCount('medical-assistance', count));
    this.adminService.getLaptopRequestCount().subscribe(count => this.setCount('laptop-request', count));
    this.adminService.getCsrAdvancesCount().subscribe(count => this.setCount('csr-advances', count));
  }

  setCount(key: string, value: number): void {
    const card = this.summaryCards.find(c => c.key === key);
    if (card) card.count = value;
  }

  updateScrollButtons(): void {
    const el = this.scrollContainer.nativeElement;
    this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    this.canScrollLeft = el.scrollLeft > 1;
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 300);
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 300);
  }
}
