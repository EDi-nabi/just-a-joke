import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormService } from '../services/form.service';

import { FormComponent } from './form.component';

class MockFormService {
  submitJoke(a: any) {}
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormComponent,
        { provide: FormService, useClass: MockFormService }
      ],
    });

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
