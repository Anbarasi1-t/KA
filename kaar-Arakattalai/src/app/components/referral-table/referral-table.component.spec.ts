import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralTableComponent } from './referral-table.component';

describe('ReferralTableComponent', () => {
  let component: ReferralTableComponent;
  let fixture: ComponentFixture<ReferralTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
