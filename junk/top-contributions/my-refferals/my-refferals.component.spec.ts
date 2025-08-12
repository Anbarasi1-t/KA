import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRefferalsComponent } from './my-refferals.component';

describe('MyRefferalsComponent', () => {
  let component: MyRefferalsComponent;
  let fixture: ComponentFixture<MyRefferalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRefferalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
