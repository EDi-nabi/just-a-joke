import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesService } from 'src/app/jokes/services/jokes.service';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent implements OnInit, OnDestroy {

  jokes$: Observable<Joke[]>;
  order$: Observable<string>;
  subscriptions: Subscription[] = [];

  constructor(
    private jokesService: JokesService,
    private uiService: UiService,
  ) {
    this.jokes$ = this.jokesService.getJokes$();
    this.order$ = this.uiService.getOrder$();
  }

  ngOnInit(): void {
    this.jokesService.dispatchApiGetJokes();
    this.subscriptions.push(
      this.order$.subscribe(order => {
        this.jokesService.dispatchSortJokes(order);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
