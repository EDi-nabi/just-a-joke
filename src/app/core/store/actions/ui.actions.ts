import { createAction, props } from '@ngrx/store';

export const setItemsPerPage = createAction(
  '[UI] Set number of items per page',
  props<{ itemsPerPage: number }>(),
);

export const setCategories = createAction(
  '[UI Storage] Save number of items per page to local storage',
  props<{ categories: string[] }>(),
);

export const saveItemsPerPage = createAction(
  '[UI] Set jokes categories',
  props<{ itemsPerPage: number }>(),
);

export const setOrder = createAction(
  '[UI] Set jokes sorting order',
  props<{ order: string }>(),
);
