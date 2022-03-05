import { TestBed } from '@angular/core/testing';

import { JokesService } from './jokes.service';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from 'src/app/core/store/reducers/core.reducers';
import { MockData } from 'src/app/testing/mock-data';
import { Observable, of } from 'rxjs';

describe('JokesService', () => {
  let service: JokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers,
        }),
      ],
      providers: [
        { provide: Store, useClass: Store }
      ]
    });
    service = TestBed.inject(JokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`'getJokes$' should return Observable`, () => {
    const mockData = new MockData();
    const jokes = mockData.getJokes();
    service.jokes$ = of(jokes);
    const testJokes = service.getJokes$();
    expect(testJokes).toBeInstanceOf(Observable)
  });




});
