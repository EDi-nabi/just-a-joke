import { UiState } from 'src/app/interfaces/ui-state.interface';
import { uiInitialState } from '../state/ui.state';
import * as UiActions from '../actions/ui.actions';


export const UiReducer = (state = uiInitialState, action: UiActions.UiActions): UiState => {
  switch (action.type) {

    case UiActions.SET_ITEMS_PER_PAGE:
      const ui = { ...state.ui };
      return { ...state, ui: { ...ui, itemsPerPage: action.payload.itemsPerPage }};

    default:
      return state;

  }
}
