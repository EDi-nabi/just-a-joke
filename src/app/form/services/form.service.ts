import { Injectable } from '@angular/core';

import { ApiService } from './../../core/services/api.service';
import { SubmitPayload } from 'src/app/interfaces/submit-payload.interface';
import { Observable } from 'rxjs';
import { SubmitResponse } from 'src/app/interfaces/submit-response.interface';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private apiService: ApiService,
  ) { }

  submitJoke(joke: SubmitPayload): Observable<SubmitResponse> {
    return this.apiService.submitJoke(joke);
  }
}
