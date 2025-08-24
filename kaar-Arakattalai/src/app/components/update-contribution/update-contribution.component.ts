import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-contribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-contribution.component.html',
  styleUrl: './update-contribution.component.scss'
})
export class UpdateContributionComponent {
  @Input() isOpen: boolean = false;
  @Input() name: string = '';   // employee name
  @Input() aid: number = 0;     // contributor_id / associate_id
  @Output() close = new EventEmitter<void>();
  
  isSaving = false;

  // Form data
  paymentMethod: string = 'salary';
  monthlyContribution: number = 0;
  transferAmount: number | null = null;
  selectedDuration: string = '12';
  duration: string = '';
  
  // Calculated data
  calculatedYears: Array<{year: string, amount: number}> = [];
  eligibleReferralAmount: number = 0;

  constructor(private http: HttpClient) {}
  
  onClose() {
    this.close.emit();
    this.resetForm();
  }
  
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
  
  onPaymentMethodChange() {
    this.resetCalculation();
  }
  
  calculateSalaryDetails() {
    this.calculatedYears = [];
    this.eligibleReferralAmount = 0;
    
    if (this.monthlyContribution && this.monthlyContribution <= 0) return;
    
    const monthly = this.monthlyContribution;
    let months = 0;
    
    switch(this.selectedDuration) {
      case '12':
        months = 12;
        break;
      case '24':
        months = 24;
        break;
      case '36':
        months = 36;
        break;
      case 'retirement':
        months = 240; // 20 years default
        break;
    }
    
    const years = Math.ceil(months / 12);
    const annualAmount = monthly! * 12;
    
    for (let i = 0; i < years; i++) {
      const year = 2025 + i;
      const remainingMonths = months - (i * 12);
      const currentYearAmount = remainingMonths >= 12 ? annualAmount : monthly! * remainingMonths;
      
      this.calculatedYears.push({
        year: `FY${year}`,
        amount: currentYearAmount
      });
    }
    
    this.eligibleReferralAmount = annualAmount * 2;
  }
  
  isFormValid(): boolean {
    if (this.paymentMethod === 'salary') {
      return this.monthlyContribution !== null && this.monthlyContribution > 0 && this.selectedDuration !== '';
    } else {
      return this.transferAmount !== null && this.transferAmount > 0;
    }
  }
  
  get isContributionValid(): boolean {
    if (this.paymentMethod === 'salary') {
      return !!this.monthlyContribution && Number(this.monthlyContribution) > 0;
    } else if (this.paymentMethod === 'bank') {
      return !!this.transferAmount && Number(this.transferAmount) > 0;
    }
    return false;
  }

  onSubmit() {
    if (!this.isFormValid()) return;
    this.isSaving = true;

    const fy = new Date().getFullYear().toString();
    const month = new Date().toLocaleString('default', { month: 'long' });

    let formData: any;

    if (this.paymentMethod === 'salary') {
      formData = {
        contributor_id: this.aid,
        fy,
        month,
        amount: this.monthlyContribution,
        transfer_type: 'salary',
        annual_contribution: this.annualContribution,
        monthly_contribution: this.monthlyContribution,
        eligible_amount: this.eligibleReferralAmount,
        balance_amount: 0,
        referral_count: 0,
        created_by: this.name
      };
    } else {
      formData = {
        contributor_id: this.aid,
        fy,
        month,
        amount: this.transferAmount,
        transfer_type: 'bank',
        annual_contribution: null,
        monthly_contribution: null,
        eligible_amount: 0,
        balance_amount: 0,
        referral_count: 0,
        created_by: this.name
      };
    }

    this.http.post('http://localhost:3000/api/contribution-history', formData).subscribe({
      next: (res) => {
        console.log("✅ Contribution saved:", res);
        this.isSaving = false;
        this.onClose();
      },
      error: (err) => {
        console.error("❌ Error saving contribution:", err);
        this.isSaving = false;
      }
    });
  }

  resetForm() {
    this.paymentMethod = 'salary';
    this.monthlyContribution = 0;
    this.selectedDuration = '12';
    this.transferAmount = 0;
    this.resetCalculation();
  }
  
  resetCalculation() {
    this.calculatedYears = [];
    this.eligibleReferralAmount = 0;
  }

  get annualContribution(): number {
    if (!this.duration || this.duration === 'retirement') return 0;
    return Number(this.duration) * (this.monthlyContribution || 0);
  }
}

