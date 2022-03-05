import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { UiService } from 'src/app/core/services/ui.service';
import { JokesService } from 'src/app/jokes/services/jokes.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnDestroy {

  itemsPerPage$: Observable<number>;
  subscriptions: Subscription[] = [];
  itemsPerPage = new FormControl('');

  constructor(
    private uiService: UiService,
    private jokesService: JokesService,
    @Inject(PLATFORM_ID) private platformId,
    ) {
    this.itemsPerPage$ = this.uiService.getItemsPerPage$();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.itemsPerPage$.subscribe(res => this.itemsPerPage.setValue(res)));
  }

  onItemsPerPageChange(): void {
    this.itemsPerPage.setValue(+this.itemsPerPage.value);
    this.uiService.dispatchSaveItemsPerPage(+this.itemsPerPage.value);
    this.getJokes();
  }

  getJokes(): void {
    this.jokesService.dispatchApiGetJokes();
    this.jokesService.dispatchSortJokes(this.uiService.getOrder());
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
