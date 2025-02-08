import { TestBed } from '@angular/core/testing';

import { UserContractService } from './user-contract.service';

describe('UserContractService', () => {
  let service: UserContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
