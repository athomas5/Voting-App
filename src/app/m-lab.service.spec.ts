import { TestBed, inject } from '@angular/core/testing';

import { MLabService } from './m-lab.service';

describe('MLabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MLabService]
    });
  });

  it('should be created', inject([MLabService], (service: MLabService) => {
    expect(service).toBeTruthy();
  }));
});
