import { createAction, props } from "@ngrx/store";

export const hydrate = createAction(
  '[Hydration] Hydrate state',
);

export const hydrateSuccess = createAction(
  '[Hydration] Success',
  props<{ itemsPerPage: number }>(),
);

export const hydrateFailure = createAction(
  '[Hydration] Failure',
);
