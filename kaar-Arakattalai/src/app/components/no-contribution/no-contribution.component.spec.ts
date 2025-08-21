import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContributionComponent } from './no-contribution.component';

describe('NoContributionComponent', () => {
  let component: NoContributionComponent;
  let fixture: ComponentFixture<NoContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoContributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
