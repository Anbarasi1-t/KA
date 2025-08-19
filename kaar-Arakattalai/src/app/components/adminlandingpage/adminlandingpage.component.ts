import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormOverlayComponent } from '../form-overlay/form-overlay.component';

@Component({
  selector: 'app-adminlandingpage',
  standalone: true,
  imports: [CommonModule, FormOverlayComponent],
  template: `
    <div class="admin-page">
      <div class="header">
        <h1>Admin Dashboard</h1>
        <button class="refer-btn" (click)="openReferralForm()">Refer Someone</button>
      </div>

      <div class="forms-container">
        <div class="form-card" *ngFor="let form of forms">
          <img [src]="form.icon" [alt]="form.title">
          <h3>{{form.title}}</h3>
        </div>
      </div>

      <app-form-overlay *ngIf="showFormOverlay" (closeOverlay)="closeFormOverlay()">
        <h2>Referral Form</h2>
        <div class="form-options">
          <div class="option" *ngFor="let form of forms" (click)="selectFormType(form)">
            <img [src]="form.icon" [alt]="form.title">
            <span>{{form.title}}</span>
          </div>
        </div>
      </app-form-overlay>
    </div>
  `,
  styleUrls: ['./adminlandingpage.component.scss']
})
export class AdminlandingpageComponent {
  showFormOverlay = false;
  
  forms = [
    { title: 'EDUCATION SUPPORT', icon: 'assets/education.svg' },
    { title: 'NGO', icon: 'assets/ngo.svg' },
    { title: 'MEDICAL SUPPORT', icon: 'assets/medical.svg' },
    { title: 'LAPTOP REQUEST', icon: 'assets/laptop.svg' },
    { title: 'CSR & CLAIMS', icon: 'assets/csr.svg' }
  ];

  openReferralForm() {
    this.showFormOverlay = true;
  }

  closeFormOverlay() {
    this.showFormOverlay = false;
  }

  selectFormType(form: any) {
    console.log('Selected form:', form.title);
    // Handle form type selection
  }
}
