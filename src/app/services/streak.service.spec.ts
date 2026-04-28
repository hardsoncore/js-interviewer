import { TestBed } from '@angular/core/testing';

import { StreakService } from './streak.service';

describe('StreakService', () => {
  let service: StreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
