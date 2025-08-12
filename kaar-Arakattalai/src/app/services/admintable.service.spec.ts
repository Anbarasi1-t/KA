// admin.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  const base = 'http://localhost:5000/api/admin';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch employees', () => {
    const mock = [
      { id: '1', employeeName: 'A', employeeAID: '123', referralType: 'Education', annualContribution: 100000, amountRequested: 50000 }
    ];

    service.getEmployees().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(mock);
    });

    const req = httpMock.expectOne(`${base}/employees`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
