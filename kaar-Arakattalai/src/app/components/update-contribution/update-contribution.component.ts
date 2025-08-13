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
  @Output() close = new EventEmitter<void>();
  
  // Form data
  paymentMethod: string = 'salary';
  monthlyContribution: number = 0;
  selectedDuration: string = '12';
  transferAmount: number = 0;
  
  // Calculated data
  calculatedYears: Array<{year: string, amount: number}> = [];
  eligibleReferralAmount: number = 0;
  
  // Backend arrays to store data
  salaryContributions: Array<any> = [];
  bankTransfers: Array<any> = [];
  
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
    
    if (this.monthlyContribution <= 0) return;
    
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
        months = 240; // 20 years as default for retirement
        break;
    }
    
    const years = Math.ceil(months / 12);
    const annualAmount = monthly * 12;
    
    for (let i = 0; i < years; i++) {
      const year = 2025 + i;
      const remainingMonths = months - (i * 12);
      const currentYearAmount = remainingMonths >= 12 ? annualAmount : monthly * remainingMonths;
      
      this.calculatedYears.push({
        year: `FY${year}`,
        amount: currentYearAmount
      });
    }
    
    this.eligibleReferralAmount = annualAmount * 2;
  }
  
  isFormValid(): boolean {
    if (this.paymentMethod === 'salary') {
      return this.monthlyContribution > 0 && this.selectedDuration !== '';
    } else {
      return this.transferAmount > 0;
    }
  }
  
  onSubmit() {
    if (!this.isFormValid()) return;
    
    let formData: any;
    
    if (this.paymentMethod === 'salary') {
      formData = {
        paymentMethod: this.paymentMethod,
        timestamp: new Date().toISOString(),
        monthlyContribution: this.monthlyContribution,
        selectedDuration: this.selectedDuration,
        calculatedYears: this.calculatedYears,
        eligibleReferralAmount: this.eligibleReferralAmount
      };
      this.salaryContributions.push(formData);
    } else {
      formData = {
        paymentMethod: this.paymentMethod,
        timestamp: new Date().toISOString(),
        transferAmount: this.transferAmount,
        bankDetails: {
          accountHolder: 'Kaar Arakattalai',
          accountType: 'Current Account',
          accountNumber: '0630102000026743',
          ifscCode: 'IBKL0000630',
          bankBranch: 'IDBI, Ashok Nagar Branch'
        }
      };
      this.bankTransfers.push(formData);
    }
    
    // Send email
    this.sendEmail(formData);
    
    console.log('Form submitted:', formData);
    console.log('Salary Contributions:', this.salaryContributions);
    console.log('Bank Transfers:', this.bankTransfers);
    
    this.onClose();
  }
  
  sendEmail(data: any) {
    const emailData = {
      to: 'narensairam2004@gmail.com',
      subject: `Contribution Update - ${this.paymentMethod === 'salary' ? 'Salary' : 'Bank Transfer'}`,
      body: this.generateEmailBody(data)
    };
    
    // This would typically be handled by a backend service
    // For now, we'll log the email data
    console.log('Email to be sent:', emailData);
    
    // In a real implementation, you would call your backend API
    // this.http.post('/api/send-email', emailData).subscribe();
  }
  
  generateEmailBody(data: any): string {
    let body = `Contribution Update Details:\n\n`;
    body += `Payment Method: ${data.paymentMethod}\n`;
    body += `Timestamp: ${data.timestamp}\n\n`;
    
    if (data.paymentMethod === 'salary') {
      body += `Monthly Contribution: ₹${data.monthlyContribution}\n`;
      body += `Selected Duration: ${data.selectedDuration}\n`;
      body += `Annual Contributions:\n`;
      data.calculatedYears.forEach((year: {year: string, amount: number}) => {
        body += `  ${year.year}: ₹${year.amount}\n`;
      });
      body += `\nEligible Referral Amount: ₹${data.eligibleReferralAmount}\n`;
    } else {
      body += `Transfer Amount: ₹${data.transferAmount}\n`;
      body += `Bank Details:\n`;
      body += `  Account Holder: ${data.bankDetails.accountHolder}\n`;
      body += `  Account Number: ${data.bankDetails.accountNumber}\n`;
      body += `  IFSC Code: ${data.bankDetails.ifscCode}\n`;
      body += `  Bank & Branch: ${data.bankDetails.bankBranch}\n`;
    }
    
    return body;
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
}
