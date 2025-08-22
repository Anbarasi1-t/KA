import { TestBed } from '@angular/core/testing';

import { TreasuryviewdetailsService } from './treasuryviewdetails.service';

describe('TreasuryviewdetailsService', () => {
  let service: TreasuryviewdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuryviewdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
