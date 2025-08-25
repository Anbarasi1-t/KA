import { TestBed } from '@angular/core/testing';

import { TreasuryactionService } from './treasuryaction.service';

describe('TreasuryactionService', () => {
  let service: TreasuryactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuryactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
