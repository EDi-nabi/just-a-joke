import { Action } from '@ngrx/store';

export const SET_ITEMS_PER_PAGE = '[UI] Set number of items per page';
export const SAVE_ITEMS_PER_PAGE = '[UI Storage] Save number of items per page to local storage';

export class SetItemsPerPage implements Action {
  readonly type: typeof SET_ITEMS_PER_PAGE = SET_ITEMS_PER_PAGE;
  constructor(public payload: { itemsPerPage: number }) { }
}

export class SaveItemsPerPage implements Action {
  readonly type: typeof SAVE_ITEMS_PER_PAGE = SAVE_ITEMS_PER_PAGE;
  constructor(public payload: { itemsPerPage: number }) { }
}

export type UiActions = SetItemsPerPage | SaveItemsPerPage;
