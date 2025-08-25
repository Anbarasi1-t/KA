import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreasurybarService } from '../../services/treasurybar.service';

@Component({
  selector: 'app-treasurybar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treasurybar.component.html',
  styleUrls: ['./treasurybar.component.scss']
})
export class TreasurybarComponent implements OnInit {
  pendingCount: number = 0;
  completedCount: number = 0;
  activeTab: 'pending' | 'completed' = 'pending';

  constructor(private treasurybarService: TreasurybarService) {}

  ngOnInit(): void {
    this.treasurybarService.getCounts().subscribe(data => {
      this.pendingCount = data.pending;
      this.completedCount = data.completed;
    });
  }

  setActiveTab(tab: 'pending' | 'completed') {
    this.activeTab = tab;
  }
}
