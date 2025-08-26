import { TestBed } from '@angular/core/testing';

import { TreasurybarService } from './treasurybar.service';

describe('TreasurybarService', () => {
  let service: TreasurybarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasurybarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
