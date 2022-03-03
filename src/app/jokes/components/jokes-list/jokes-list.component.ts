import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesService } from 'src/app/jokes/services/jokes.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent {

  jokes$: Observable<Joke[]>;

  constructor(
    private jokesService: JokesService,
  ) {
    this.jokes$ = this.jokesService.getJokes$();
  }

}
