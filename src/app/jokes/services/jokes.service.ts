import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from 'src/app/core/store';
import * as JokesActions from 'src/app/core/store/actions/jokes.actions';
import { Joke } from 'src/app/interfaces/joke.interface';
import { CoreState } from 'src/app/interfaces/core-state.interface';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  public jokes$: Observable<Joke[]>;

  constructor(
    private store: Store<CoreState>
  ) {
    this.jokes$ = this.store.select(fromStore.getJokes);
  }

  // get from state
  getJokes$(): Observable<Joke[]> {
    return this.jokes$;
  }

  // dispatch actions
  dispatchApiGetJokes(): void {
    this.store.dispatch(JokesActions.apiGetJokes());
  }

  dispatchAddJoke(joke: Joke): void {
    this.store.dispatch(JokesActions.addJoke({ joke }));
  }

  dispatchSortJokes(order: string): void {
    this.store.dispatch(JokesActions.sortJokes({ order }));
  }

}





