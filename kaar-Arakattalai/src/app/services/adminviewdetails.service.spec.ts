import { TestBed } from '@angular/core/testing';

import { AdminviewdetailsService } from './adminviewdetails.service';

describe('AdminviewdetailsService', () => {
  let service: AdminviewdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminviewdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
