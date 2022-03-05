import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { UiService } from './ui.service';
import { reducers } from '../store/reducers/core.reducers';

describe('UiService', () => {
  let service: UiService;

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
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
