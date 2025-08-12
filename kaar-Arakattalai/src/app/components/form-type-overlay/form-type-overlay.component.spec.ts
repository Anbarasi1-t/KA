import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeOverlayComponent } from './form-type-overlay.component';

describe('FormTypeOverlayComponent', () => {
  let component: FormTypeOverlayComponent;
  let fixture: ComponentFixture<FormTypeOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTypeOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
