import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-contribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="update-contribution-box">
      <label class="currency-label">INR</label>
      <h3 class="title">Update Contribution</h3>

      <div class="slider-container">
        <input
          type="range"
          min="0"
          [max]="maxSteps"
          [step]="1"
          [(ngModel)]="sliderStep"
          (input)="updateAmount()"
        />
        <div class="range-values">
          <span>0</span>
          <span>{{ maxAmount | number }}</span>
        </div>
        <p class="current-amount">Amount: ₹{{ contributionAmount | number }}</p>
      </div>

      <div class="options">
        <label class="checkbox">
          <input type="checkbox" [(ngModel)]="isActive" />
          Active Contribution
        </label>
        <button
          class="update-button"
          [class.updated]="isUpdated"
          (click)="onUpdate()"
        >
          Update
        </button>
      </div>
    </div>
  `,
  styles: [`
    .update-contribution-box {
      padding: 16px;
      border-radius: 8px;
      background-color: #ffffff;
      border: 13 px solid #0d0d0dff;
      width: 260px;
      margin: 1rem auto;
      font-family: 'DM Sans', sans-serif;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .currency-label {
      font-size: 12px;
      color: #B0B0B0;
      margin-bottom: 4px;
    }

    .title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #1B1C57;
    }

    .slider-container {
      margin-bottom: 1rem;
    }

    input[type="range"] {
      width: 100%;
      appearance: none;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right,#f6d0d5, #f85e72 );
      outline: none;
      transition: background 0.3s;
    }

    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #f85e72;
      cursor: pointer;
      margin-top: -6px;
    }

    .range-values {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #333;
      margin-top: 4px;
    }

    .current-amount {
      font-size: 0.95rem;
      color: #444;
      font-weight: bold;
      margin-top: 6px;
    }

    .options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .checkbox {
      font-size: 0.9rem;
      color: #6E6E6E;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .update-button {
      border: 2px solid #f85e72;
      background: white;
      color: #f85e72;
      font-weight: 600;
      padding: 0.4rem 1.2rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .update-button:hover {
      background: #f85e72;
      color: white;
    }

    .update-button.updated {
      background: #f85e72 !important;
      color: white !important;
    }

    @media screen and (max-width: 600px) {
      .update-contribution-box {
        padding: 1rem;
        width: 90%;
      }

      .options {
        flex-direction: column;
        align-items: stretch;
      }

      .update-button {
        width: 100%;
      }
    }
  `]
})
export class UpdateContributionComponent {
  maxAmount: number = 500000;
  stepValue: number = 1000;
  maxSteps: number = this.maxAmount / this.stepValue;
  sliderStep: number = 0;

  contributionAmount: number = 0;
  isActive: boolean = false;
  isUpdated: boolean = false;

  // ✅ This variable stores the selected data — ready for backend use
  savedContribution: { amount: number; active: boolean } | null = null;

  updateAmount() {
    this.contributionAmount = this.sliderStep * this.stepValue;
    this.isUpdated = false;
  }

  onUpdate() {
    this.savedContribution = {
      amount: this.contributionAmount,
      active: this.isActive
    };
    this.isUpdated = true;
    console.log('Saved for backend:', this.savedContribution);
  }
}
