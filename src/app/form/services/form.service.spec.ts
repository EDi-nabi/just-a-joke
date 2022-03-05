import { MockData } from 'src/app/testing/mock-data';
import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/core/services/api.service';

import { FormService } from './form.service';
import { Observable, of } from 'rxjs';

class MockApiService {
  submitJoke(a: any) { return of(a) }
}

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useClass: MockApiService },
      ]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'submitJoke() should return Observable`, () => {
    const mockData = new MockData();
    const submitPayload = mockData.getSubmitPayload();
    expect(service.submitJoke(submitPayload)).toBeInstanceOf(Observable);
  });
});

