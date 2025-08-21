import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryviewdetailsComponent } from './treasuryviewdetails.component';

describe('TreasuryviewdetailsComponent', () => {
  let component: TreasuryviewdetailsComponent;
  let fixture: ComponentFixture<TreasuryviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasuryviewdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasuryviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
