import { createSelector } from '@ngrx/store';
import { CoreState } from 'src/app/interfaces/core-state.interface';

import * as coreSelectors from './selectors/core.selectors';
import * as jokesSelectors from './selectors/jokes.selectors';

// selector functions for jokes
export const getJokesState = createSelector(coreSelectors.selectCoreState, (state: CoreState) => state.jokes);
export const getJokes = createSelector( getJokesState, jokesSelectors.getJokes );
