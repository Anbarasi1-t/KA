import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTypeOverlayComponent } from '../form-type-overlay/form-type-overlay.component';
import { RequestService } from '../../services/requests.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule, FormTypeOverlayComponent, FormsModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements OnInit {
  showOverlay = false;
  totalContribution: number = 0;
  searchTerm: string = '';
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterToggle = new EventEmitter<void>();

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getTotalContribution().subscribe((data: number) => {
      this.totalContribution = data;
    });
  }

  getTotalContribution(): void {
    this.requestService.getTotalContribution().subscribe((data: number) => {
      this.totalContribution = data;
    });
  }

  onSearchChange(event: any): void {
    const searchValue = event.target.value;
    this.searchChange.emit(searchValue);
  }

  onSearchClick(): void {
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchChange.emit('');
  }

  onFilterIconClick(): void {
    this.filterToggle.emit();
  }
}