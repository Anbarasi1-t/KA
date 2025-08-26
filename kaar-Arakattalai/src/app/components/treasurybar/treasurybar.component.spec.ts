import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurybarComponent } from './treasurybar.component';

describe('TreasurybarComponent', () => {
  let component: TreasurybarComponent;
  let fixture: ComponentFixture<TreasurybarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasurybarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasurybarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
