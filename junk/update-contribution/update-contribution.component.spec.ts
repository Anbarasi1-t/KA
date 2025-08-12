import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UpdateContributionComponent } from './update-contribution.component';

describe('UpdateContributionComponent', () => {
  let component: UpdateContributionComponent;
  let fixture: ComponentFixture<UpdateContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContributionComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.contributionAmount).toBe(0);
    expect(component.maxAmount).toBe(500000);
    expect(component.isActive).toBeFalse();
  });

  it('should update contribution amount when slider changes', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="range"]');
    input.value = '300000';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.contributionAmount).toBe(300000);
  });

  it('should toggle active status when checkbox is clicked', () => {
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    fixture.detectChanges();

    expect(component.isActive).toBeTrue();
  });

  it('should log update info when update button is clicked', () => {
    spyOn(console, 'log');
    component.contributionAmount = 100000;
    component.isActive = true;

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(console.log).toHaveBeenCalledWith('Updated Contribution:', {
      amount: 100000,
      active: true
    });
  });
});
