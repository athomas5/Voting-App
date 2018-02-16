import { TestBed, inject } from '@angular/core/testing';

import { VotingDataService } from './voting-data.service';

describe('VotingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingDataService]
    });
  });

  it('should be created', inject([VotingDataService], (service: VotingDataService) => {
    expect(service).toBeTruthy();
  }));
});
