import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UiService } from 'src/app/core/services/ui.service';
import { JokesService } from '../../services/jokes.service';
import { MockData } from 'src/app/testing/mock-data';
import { JokesListComponent } from './jokes-list.component';

class MockUiService {
  getOrder$() {}
}

class MockJokesService {
  getJokes$() {}
  dispatchApiGetJokes() {}
}

describe('JokesListComponent', () => {
  let component: JokesListComponent;
  let fixture: ComponentFixture<JokesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesListComponent ],
      providers: [
        { provide: UiService, useClass: MockUiService },
        { provide: JokesService, useClass: MockJokesService },
       ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesListComponent);
    component = fixture.componentInstance;
    const mockData = new MockData();
    component.jokes$ = of(mockData.getJokes());
    component.order$ = of('asc');
    component.subscriptions = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

