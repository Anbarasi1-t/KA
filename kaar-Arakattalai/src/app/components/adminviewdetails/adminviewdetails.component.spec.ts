import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewdetailsComponent } from './adminviewdetails.component';

describe('AdminviewdetailsComponent', () => {
  let component: AdminviewdetailsComponent;
  let fixture: ComponentFixture<AdminviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminviewdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
