import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';

import * as UiActions from '../actions/ui.actions';

@Injectable()
export class UiEffects {

  apiSaveItemsPerPage = createEffect(() => this.actions$.pipe(
    ofType(UiActions.SAVE_ITEMS_PER_PAGE),
    map((itemsPerPage: number) => {
      this.storageService.set('ui', 'itemsPerPage', itemsPerPage).subscribe();
      return { type: UiActions.SET_ITEMS_PER_PAGE, payload: itemsPerPage };
    }),
  ));

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {}
}
