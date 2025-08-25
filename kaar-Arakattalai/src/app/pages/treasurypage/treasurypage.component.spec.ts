import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurypageComponent } from './treasurypage.component';

describe('TreasurypageComponent', () => {
  let component: TreasurypageComponent;
  let fixture: ComponentFixture<TreasurypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasurypageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasurypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
