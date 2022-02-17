import { TestBed } from '@angular/core/testing';

import { XlsServiceService } from './xls-service.service';

describe('XlsServiceService', () => {
  let service: XlsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
