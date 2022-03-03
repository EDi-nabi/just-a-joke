import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { StorageService } from "../../services/storage.service";
import * as HydrationActions from "../actions/hydration.actions";

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate.type),
      map(action => action),
      switchMap(() => this.storageService.get<number>('ui', 'itemsPerPage', { type: 'number' })),
      map(itemsPerPage => {
        if (itemsPerPage) {
          return HydrationActions.hydrateSuccess({ itemsPerPage });
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  constructor(
    private action$: Actions,
    private storageService: StorageService,
  ) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}
