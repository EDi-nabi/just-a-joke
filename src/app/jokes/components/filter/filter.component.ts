import { JokesService } from 'src/app/jokes/services/jokes.service';
import { UiService } from 'src/app/core/services/ui.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  categories: { name: string, state: boolean }[] = [
    { name: 'Programming', state: false },
    { name: 'Misc', state: false },
    { name: 'Dark', state: false },
    { name: 'Pun', state: false },
    { name: 'Spooky', state: false },
    { name: 'Christma', state: false },
  ]

  constructor(
    private uiService: UiService,
    private jokesService: JokesService,
  ) { }

  toggleCategory(index: number): void {
    this.categories[index].state = !this.categories[index].state;
    this.uiService.dispatchSetCategories(this.categories.filter(cat => cat.state === true).map(cat => cat.name));
    this.jokesService.dispatchApiGetJokes();
  }

}
