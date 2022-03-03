import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';

import * as UiActions from '../actions/ui.actions';

@Injectable()
export class UiEffects {

  saveItemsPerPage = createEffect(() => this.actions$.pipe(
    ofType(UiActions.saveItemsPerPage.type),
    map((action) => {
      this.storageService.set('ui', 'itemsPerPage', action['itemsPerPage']).subscribe();
      return UiActions.setItemsPerPage({ itemsPerPage: action['itemsPerPage'] });
    }),
  ));

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {}
}
