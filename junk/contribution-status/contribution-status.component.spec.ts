import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributionStatusComponent } from './contribution-status.component';
import { CommonModule } from '@angular/common';

describe('ContributionStatusComponent', () => {
  let component: ContributionStatusComponent;
  let fixture: ComponentFixture<ContributionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributionStatusComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionStatusComponent);
    component = fixture.componentInstance;
    component.status = 'Active';
    component.annualContribution = 50000;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
