import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributionsComponent } from './top-contributions.component';

describe('TopContributionsComponent', () => {
  let component: TopContributionsComponent;
  let fixture: ComponentFixture<TopContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
