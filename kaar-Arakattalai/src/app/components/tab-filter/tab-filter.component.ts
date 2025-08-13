import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/requests.service';

@Component({
  selector: 'app-tab-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-filter.component.html',
  styleUrls: ['./tab-filter.component.scss']
})
export class TabFilterComponent implements OnInit {
  categories = [
    { name: 'Sanctioned', count: 0, colorClass: 'sanctioned' },
    { name: 'Rejected', count: 0, colorClass: 'rejected' },
    { name: 'Education', count: 0, colorClass: 'education' },
    { name: 'Medical', count: 0, colorClass: 'medical' },
    { name: 'CSR Claims', count: 0, colorClass: 'csr' },
    { name: 'Laptop', count: 0, colorClass: 'laptop' }
  ];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadCategoryCounts();
  }

  loadCategoryCounts(): void {
    this.requestService.getSanctionedCount().subscribe(count => {
      this.categories.find(c => c.name === 'Sanctioned')!.count = count;
    });
    this.requestService.getRejectedCount().subscribe(count => {
      this.categories.find(c => c.name === 'Rejected')!.count = count;
    });
    this.requestService.getEducationCount().subscribe(count => {
      this.categories.find(c => c.name === 'Education')!.count = count;
    });
    this.requestService.getMedicalCount().subscribe(count => {
      this.categories.find(c => c.name === 'Medical')!.count = count;
    });
    this.requestService.getCsrClaimsCount().subscribe(count => {
      this.categories.find(c => c.name === 'CSR Claims')!.count = count;
    });
    this.requestService.getLaptopCount().subscribe(count => {
      this.categories.find(c => c.name === 'Laptop')!.count = count;
    });
  }
}
