import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-contribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-contribution.component.html',
  styleUrls: ['./update-contribution.component.scss']
})
export class UpdateContributionComponent {
  @Input() isOpen: boolean = false;
  @Input() name: string = '';       // Employee name
  @Input() aid: number = 0;         // contributor_id
  @Output() close = new EventEmitter<void>();
  @Output() contributionUpdated = new EventEmitter<void>();

  isSaving = false;
  successMessage: string = '';
  errorMessage: string = '';

  paymentMethod: string = 'salary';
  monthlyContribution: number = 0;
  transferAmount: number | null = null;
  selectedDuration: string = '12';
  duration: string = '';
  calculatedYears: Array<{year: string, amount: number}> = [];
  eligibleReferralAmount = 0;

  constructor(private http: HttpClient) {}

  onClose() {
    this.close.emit();
    this.resetForm();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.onClose();
  }

  onPaymentMethodChange() {
    this.resetCalculation();
  }

  calculateSalaryDetails() {
    this.calculatedYears = [];
    this.eligibleReferralAmount = 0;

    if (!this.monthlyContribution || this.monthlyContribution <= 0) return;

    let months = 0;
    switch(this.selectedDuration) {
      case '12': months = 12; break;
      case '24': months = 24; break;
      case '36': months = 36; break;
      case 'retirement': months = 240; break;
    }

    const years = Math.ceil(months / 12);
    const annualAmount = this.monthlyContribution * 12;

    for (let i = 0; i < years; i++) {
      const year = new Date().getFullYear() + i;
      const remainingMonths = months - i * 12;
      const currentYearAmount = remainingMonths >= 12 ? annualAmount : this.monthlyContribution * remainingMonths;
      this.calculatedYears.push({ year: `FY${year}`, amount: currentYearAmount });
    }

    this.eligibleReferralAmount = annualAmount * 2;
  }

  isFormValid(): boolean {
    if (this.paymentMethod === 'salary') {
      return !!this.monthlyContribution && this.monthlyContribution > 0 && this.selectedDuration !== '';
    } else {
      return !!this.transferAmount && this.transferAmount > 0;
    }
  }

  get annualContribution(): number {
    if (!this.duration || this.duration === 'retirement') return 0;
    return Number(this.duration) * (this.monthlyContribution || 0);
  }

  onSubmit() {
    if (!this.isFormValid()) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const fy = new Date().getFullYear().toString();

    // Backend will resolve contributor via employee_aid or associate_id using 'aid'
    const formData = {
      aid: this.aid,
      fy,
      annual_contribution: this.annualContribution,
      monthly_contribution: this.paymentMethod === 'salary' ? this.monthlyContribution : null,
      eligible_amount: this.eligibleReferralAmount,
      balance_amount: 0,
      referral_count: 0,
      created_by: this.name
    };

    this.http.post('http://localhost:3000/api/contributors/contribution', formData)
      .subscribe({
        next: (res: any) => {
          this.isSaving = false;
          this.successMessage = 'Contribution saved successfully!';
          this.contributionUpdated.emit();
          setTimeout(() => this.onClose(), 1500);
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = err.error?.error || 'Failed to save contribution. Please try again.';
          console.error('❌ Error saving contribution:', err);
        }
      });
  }

  resetForm() {
    this.paymentMethod = 'salary';
    this.monthlyContribution = 0;
    this.selectedDuration = '12';
    this.transferAmount = 0;
    this.successMessage = '';
    this.errorMessage = '';
    this.calculatedYears = [];
    this.eligibleReferralAmount = 0;
    this.resetCalculation();
  }
  resetCalculation() {
    this.calculatedYears = [];
    this.eligibleReferralAmount = 0;
  }
}
