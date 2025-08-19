import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/requests.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  totalRecommendations: number = 0;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadTotalRecommendations();
  }

  loadTotalRecommendations(): void {
    this.requestService.getAllCount().subscribe((count: number) => {
      this.totalRecommendations = count;
    });
  }
}
