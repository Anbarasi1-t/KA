import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryactionComponent } from './treasuryaction.component';

describe('TreasuryactionComponent', () => {
  let component: TreasuryactionComponent;
  let fixture: ComponentFixture<TreasuryactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasuryactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasuryactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
