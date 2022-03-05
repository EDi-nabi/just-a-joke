import { uiReducer } from './ui.reducers';
import { uiInitialState } from './../state/ui.state';
import * as UiActions from './../actions/ui.actions';

describe('UiReducers', () => {

  describe('setItemsPerPage action', () => {
    it('should set itemsPerPage', () => {
      const initialState = uiInitialState;
      const action = UiActions.setItemsPerPage({ itemsPerPage: 3 });
      const state = uiReducer(initialState, action);
      expect(state.ui.itemsPerPage).toEqual(3);
    });
  });

  describe('setCategories action', () => {
    it('should set Categories', () => {
      const initialState = uiInitialState;
      const action = UiActions.setCategories({ categories: ['a', 'b', 'c'] });
      const state = uiReducer(initialState, action);
      expect(state.ui.categories).toHaveSize(3);
      expect(state.ui.categories).toEqual(['a', 'b', 'c']);
    });
  });

  describe('setOrder action', () => {
    it('should set order', () => {
      const initialState = uiInitialState;
      const action = UiActions.setOrder({ order: 'desc' });
      const state = uiReducer(initialState, action);
      expect(state.ui.order).toEqual('desc');
    });
  });
});
