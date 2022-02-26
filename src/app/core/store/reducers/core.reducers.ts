import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { JokesReducer } from './jokes.reducers';
import { CoreState } from 'src/app/interfaces/core-state.interface';

export const reducers: ActionReducerMap<CoreState, any> = {
  jokes: JokesReducer,
};
