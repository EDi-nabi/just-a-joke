import { UiState } from 'src/app/interfaces/ui-state.interface';
import { uiInitialState } from '../state/ui.state';
import * as UiActions from '../actions/ui.actions';


export const uiReducer = (state = uiInitialState, action: any): UiState => {
  switch (action.type) {

    case UiActions.setItemsPerPage.type:
      return { ...state, ui: { ...state.ui, itemsPerPage: action.itemsPerPage }};

    case UiActions.setCategories.type:
      let categories = [...action.categories];
      if (categories.length === 0) {
        categories = ['Any'];
      }
      return { ...state, ui: { ...state.ui, categories }}

    case UiActions.setOrder.type:
      return { ...state, ui: { ...state.ui, order: action.order }}

    default:
      return state;
  }
}
