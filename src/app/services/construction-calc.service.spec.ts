import { TestBed } from '@angular/core/testing';

import { ConstructionCalcService } from './construction-calc.service';

describe('ConstructionCalcService', () => {
  let service: ConstructionCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructionCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
