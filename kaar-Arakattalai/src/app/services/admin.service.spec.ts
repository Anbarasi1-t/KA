// src/app/services/admin.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  const base = 'http://localhost:5000/api/summary-cards';

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

  it('should call requests endpoint', () => {
    service.getRequestsCount().subscribe((v) => expect(v).toBe(120));
    const req = httpMock.expectOne(`${base}/requests`);
    expect(req.request.method).toBe('GET');
    req.flush(120);
  });

  it('should call approvals endpoint', () => {
    service.getApprovalsCount().subscribe((v) => expect(v).toBe(95));
    const req = httpMock.expectOne(`${base}/approvals`);
    expect(req.request.method).toBe('GET');
    req.flush(95);
  });

  // add more tests for other endpoints as needed
});
