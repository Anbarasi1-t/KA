import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminactionComponent } from './adminaction.component';

describe('AdminactionComponent', () => {
  let component: AdminactionComponent;
  let fixture: ComponentFixture<AdminactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
