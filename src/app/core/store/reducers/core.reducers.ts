import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { hydrationMetaReducer } from "./hydration.reducers";
import { jokesReducer } from './jokes.reducers';
import { CoreState } from 'src/app/interfaces/core-state.interface';
import { uiReducer } from './ui.reducers';

// reducers
export const reducers: ActionReducerMap<CoreState, any> = {
  jokes: jokesReducer,
  ui: uiReducer,
};

// meta reducers
export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
