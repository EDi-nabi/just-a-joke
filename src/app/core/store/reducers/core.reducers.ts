import { ActionReducerMap } from '@ngrx/store';

import { JokesReducer } from './jokes.reducers';
import { CoreState } from 'src/app/interfaces/core-state.interface';
import { UiReducer } from './ui.reducers';

export const reducers: ActionReducerMap<CoreState, any> = {
  jokes: JokesReducer,
  ui: UiReducer,
};
