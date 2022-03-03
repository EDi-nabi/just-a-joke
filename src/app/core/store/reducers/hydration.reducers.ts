import * as HydrationActions from '../actions/hydration.actions';
import { CoreState } from 'src/app/interfaces/core-state.interface';
import { Action, ActionReducer } from '@ngrx/store';

function isHydrateSuccess(action: Action): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
  return action.type === HydrationActions.hydrateSuccess.type;
}

export function hydrationMetaReducer(reducer: ActionReducer<CoreState>): ActionReducer<CoreState> {
  const metaReducer = (state, action) => {
    if (isHydrateSuccess(action)) {
      return { ...state, core: { ...state.core, ui: { ...state.core.ui, ui: { ...state.core.ui.ui, itemsPerPage: action.itemsPerPage }}}};
    }
    return reducer(state, action);
  };
  return metaReducer;
}

