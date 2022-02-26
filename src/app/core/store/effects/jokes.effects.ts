import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';


import { CoreState } from 'src/app/interfaces/core-state.interface';
import * as JokesActions from '../actions/jokes.actions';
import { Joke } from 'src/app/interfaces/joke.interface';
import { ApiService } from '../../services/api.service';

@Injectable()
export class JokesEffects {

  apiGetJokes = createEffect(() => this.actions$.pipe(
    ofType(JokesActions.API_GET_JOKES),
    switchMap((action: JokesActions.ApiGetJokes) => {
      return this.apiService.getJokes(action.payload.categories, action.payload.flags, action.payload.amount);
    }),
    map((jokes: Joke[]) => {
        return {
          type: JokesActions.ADD_JOKES,
          payload: jokes,
        };
      }
    )
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}
}
