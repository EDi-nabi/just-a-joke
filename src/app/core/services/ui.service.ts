import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as selectors from 'src/app/core/store';
import * as UiActions from 'src/app/core/store/actions/ui.actions';
import { CoreState } from 'src/app/interfaces/core-state.interface';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  itemsPerPage$: Observable<number>;
  order$: Observable<string>;

  constructor(
    private store: Store<CoreState>,
  ) {
    this.itemsPerPage$ = this.store.select(selectors.getItemsPerPage);
    this.order$ = this.store.select(selectors.getOrder);
  }

  // get from state
  getItemsPerPage$(): Observable<number> {
      return this.itemsPerPage$;
  }

  getOrder$(): Observable<string> {
      return this.order$;
  }

  // dispatch actions
  dispatchSaveItemsPerPage(itemsPerPage: number): void {
    this.store.dispatch(UiActions.saveItemsPerPage({ itemsPerPage }));
  }

  dispatchSetOrder(order: string): void {
    this.store.dispatch(UiActions.setOrder({ order }));
  }

  dispatchSetCategories(categories: string[]): void {
    this.store.dispatch(UiActions.setCategories({ categories }));
  }

}
