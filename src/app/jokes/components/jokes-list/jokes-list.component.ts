import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesService } from 'src/app/jokes/services/jokes.service';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent {

  jokes$: Observable<Joke[]>;

  constructor(
    private jokesService: JokesService,
    private UiService: UiService,
  ) {
    this.jokes$ = this.jokesService.getJokes$();
  }

  // getJokes(): Observable<Joke[]> {
  //   return this.jokesService.getJokes$();
  // }

  getItemsPerPage(): Observable<number> {
    return this.UiService.getItemsPerPage$();
  }

}
