import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContributionComponent } from './update-contribution.component';

describe('UpdateContributionComponent', () => {
  let component: UpdateContributionComponent;
  let fixture: ComponentFixture<UpdateContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
