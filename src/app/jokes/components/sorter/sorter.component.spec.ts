import { UiService } from 'src/app/core/services/ui.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterComponent } from './sorter.component';
import { of } from 'rxjs';

class MockUiService {
  getOrder$() {}
}

describe('SorterComponent', () => {
  let component: SorterComponent;
  let fixture: ComponentFixture<SorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorterComponent ],
      providers: [
        { provide: UiService, useClass: MockUiService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    component.order$ = of('asc');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
