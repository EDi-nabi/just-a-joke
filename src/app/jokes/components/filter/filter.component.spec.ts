import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { UiService } from 'src/app/core/services/ui.service';
import { JokesService } from '../../services/jokes.service';

class MockUiService {
  getOrder$() {}
}

class MockJokesService {
  getJokes$() {}
  dispatchApiGetJokes() {}
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [
        { provide: UiService, useClass: MockUiService },
        { provide: JokesService, useClass: MockJokesService },
       ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.categories = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
