import { JokesService } from 'src/app/jokes/services/jokes.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent {

  order$: Observable<string>;

  constructor(
    private uiService: UiService,
    private jokesService: JokesService,
  ) {
    this.order$ = this.uiService.getOrder$();
  }

  setOrder(order: string): void {
    this.uiService.dispatchSetOrder(order);
    this.jokesService.dispatchSortJokes(order);
  }

}
