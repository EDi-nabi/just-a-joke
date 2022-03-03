import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as JokesActions from '../actions/jokes.actions';
import * as selectors from '../';
import { CoreState } from 'src/app/interfaces/core-state.interface';
import { ApiService } from '../../services/api.service';


@Injectable()
export class JokesEffects {

  apiGetJokes = createEffect(() => this.actions$.pipe(
    ofType(JokesActions.apiGetJokes.type),
    map((action) => action),
    switchMap(() => this.store.select(selectors.getUi)),
    switchMap(ui => {
      return this.apiService.getJokes(ui.categories, ui.itemsPerPage);
    }),
    withLatestFrom(this.store.select(selectors.getUi)),
    map(([jokes, ui]) => {
      jokes = jokes.map(joke => {
        const filters: string[] = [];
        if (joke.category.trim().toLowerCase() === 'dark') { filters.push('grayscale') }
        if (joke.flags.racist === true) { filters.push('blur') }
        joke.image = this.apiService.getImage('joke_' + joke.id, filters.join('&'));
        return joke;
      });
      return JokesActions.addJokes({ jokes, order: ui.order });
    }),
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<CoreState>,
  ) {}
}
