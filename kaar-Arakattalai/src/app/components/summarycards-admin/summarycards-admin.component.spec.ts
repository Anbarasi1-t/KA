// src/app/components/summarycards-admin/summarycards-admin.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummarycardsAdminComponent } from './summarycards-admin.component';
import { AdminService } from '../../services/admin.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SummarycardsAdminComponent', () => {
  let component: SummarycardsAdminComponent;
  let fixture: ComponentFixture<SummarycardsAdminComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    // create spy object for AdminService with all methods used
    adminServiceSpy = jasmine.createSpyObj('AdminService', [
      'getRequestsCount',
      'getApprovalsCount',
      'getRejectedCount',
      'getScholarshipFormCount',
      'getAssistanceNgoCount',
      'getMedicalAssistanceCount',
      'getLaptopRequestCount',
      'getCsrAdvancesCount'
    ]);

    // default spy returns
    adminServiceSpy.getRequestsCount.and.returnValue(of(120));
    adminServiceSpy.getApprovalsCount.and.returnValue(of(95));
    adminServiceSpy.getRejectedCount.and.returnValue(of(15));
    adminServiceSpy.getScholarshipFormCount.and.returnValue(of(45));
    adminServiceSpy.getAssistanceNgoCount.and.returnValue(of(30));
    adminServiceSpy.getMedicalAssistanceCount.and.returnValue(of(20));
    adminServiceSpy.getLaptopRequestCount.and.returnValue(of(12));
    adminServiceSpy.getCsrAdvancesCount.and.returnValue(of(8));

    await TestBed.configureTestingModule({
      imports: [SummarycardsAdminComponent],
      providers: [{ provide: AdminService, useValue: adminServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SummarycardsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 8 cards', () => {
    fixture.detectChanges();
    const elems = fixture.debugElement.queryAll(By.css('.summary-card'));
    expect(elems.length).toBe(8);
  });

  it('should show the Requests count from the service', () => {
    fixture.detectChanges();
    const first = fixture.debugElement.query(By.css('.summary-card .title'));
    // ensure a title exists
    expect(first.nativeElement.textContent).toContain('Requests');
    // find the corresponding card content
    const requestCard = fixture.debugElement.queryAll(By.css('.summary-card'))[0];
    expect(requestCard.nativeElement.textContent).toContain('120');
  });

  it('should scrollRight when right button clicked', () => {
    spyOn(component, 'scrollRight');
    const rightBtn = fixture.debugElement.query(By.css('.scroll-btn.right')).nativeElement;
    rightBtn.click();
    expect(component.scrollRight).toHaveBeenCalled();
  });
});
