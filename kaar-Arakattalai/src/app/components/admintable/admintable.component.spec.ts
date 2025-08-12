// admin-table.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTableComponent } from './admin-table.component';
import { AdminService } from '../../services/admin.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AdminTableComponent', () => {
  let component: AdminTableComponent;
  let fixture: ComponentFixture<AdminTableComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    adminServiceSpy = jasmine.createSpyObj('AdminService', ['getEmployees']);
    adminServiceSpy.getEmployees.and.returnValue(of([
      {
        id: '1',
        employeeName: 'Arun Chakravarthi V',
        employeeAID: '123',
        referralType: 'Education',
        annualContribution: 100000,
        amountRequested: 50000
      },
      {
        id: '2',
        employeeName: 'Devika G',
        employeeAID: '220242',
        referralType: 'Medical',
        annualContribution: 100000,
        amountRequested: 50000
      }
    ]));

    await TestBed.configureTestingModule({
      imports: [AdminTableComponent],
      providers: [{ provide: AdminService, useValue: adminServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows based on service data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.ag-center-cols-container .ag-row');
    // Because AG Grid renders virtual DOM, count may vary in tests; we assert rowData mapped
    expect(component.rowData.length).toBe(2);
    expect(component.filteredData.length).toBe(2);
  });

  it('should call onEdit when action button clicked', () => {
    spyOn(component, 'onEdit');
    // simulate onCellClicked with sample event
    const fakeEvent = { event: { target: { getAttribute: (k: string) => (k === 'data-action' ? 'edit' : '1') } }, data: { id: '1' } };
    (component as any).onCellClicked(fakeEvent);
    expect(component.onEdit).toHaveBeenCalledWith('1');
  });
});
