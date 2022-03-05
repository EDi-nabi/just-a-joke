import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { UiService } from 'src/app/core/services/ui.service';
import { JokesService } from '../../services/jokes.service';
import { of } from 'rxjs';

class MockUiService {
  getItemsPerPage$() {}
}

class MockJokesService {
  getJokes$() {}
  dispatchApiGetJokes() {}
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers: [
        { provide: UiService, useClass: MockUiService },
        { provide: JokesService, useClass: MockJokesService },
       ],
     })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.itemsPerPage$ = of(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
