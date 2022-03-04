import { UiService } from 'src/app/core/services/ui.service';
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
    withLatestFrom(this.store.select(selectors.getUi)),
    switchMap(([action, ui]) => this.apiService.getJokes(ui.categories, ui.itemsPerPage)),
    map(jokes => {
      jokes = jokes.map(joke => {
        const filters: string[] = [];
        if (joke.category.trim().toLowerCase() === 'dark') { filters.push('grayscale') }
        if (joke.flags.racist === true) { filters.push('blur') }
        joke.image = this.apiService.getImage('joke_' + joke.id, filters.join('&'));
        return joke;
      });
      jokes.sort((a, b) => (a.id > b.id) ? 1 : -1);
      if (this.uiService.getOrder() === 'desc') {
        jokes.reverse();
      }
      return JokesActions.addJokes({ jokes });
    }),
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private uiService: UiService,
    private store: Store<CoreState>,
  ) {}
}
