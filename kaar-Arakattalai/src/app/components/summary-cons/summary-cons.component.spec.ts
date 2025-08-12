import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryConsComponent } from './summary-cons.component';
import { Component } from '@angular/core';

describe('SummaryConsComponent', () => {
  let component: SummaryConsComponent;
  let fixture: ComponentFixture<SummaryConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryConsComponent], // Standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render summary content container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.summary-cons-wrapper')).toBeTruthy();
  });
});
