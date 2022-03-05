import { SubmitResponse } from 'src/app/interfaces/submit-response.interface';
import { CoreState } from '../interfaces/core-state.interface';
import { JokesState } from '../interfaces/jokes-state.interface';
import { UiState } from '../interfaces/ui-state.interface';
import { Joke } from '../interfaces/joke.interface';
import { SubmitPayload } from '../interfaces/submit-payload.interface';

export class MockData {
  private uiState: UiState = {
    ui: {
      itemsPerPage: 10,
      categories: ['Any'],
      order: 'asc',
    }
  };
  private joke: Joke = {
    category: 'Misc',
    type: 'single',
    joke: 'Lorem ipsum dolor...',
    flags: {
        nsfw: false,
        religious: false,
        racist: false,
        sexist: false,
        political: false,
        explicit: false
    },
    id: 1,
    safe: true,
    lang: 'en'
  };
  private jokes: Joke[] = [{ ...this.joke, id: 2 }, this.joke, { ...this.joke, id: 3 }];
  private jokesState: JokesState = { jokes: this.jokes };
  private coreState: CoreState = { jokes: this.jokesState, ui: this.uiState };
  private submitPayload: SubmitPayload = {
    formatVersion: 3,
    category: 'Misc',
    type: 'single',
    joke: 'Lorem ipsum dolor...',
    flags: {
        nsfw: false,
        religious: false,
        racist: false,
        sexist: false,
        political: false,
        explicit: false
    },
    lang: 'en',
  }
  private submitResponse: SubmitResponse = {
    error: false,
    message: 'Joke submission was successfully saved. It will soon be checked out by the author.',
    submission: this.submitPayload,
    timestamp: 12345,
  }

  getCoreState() { return this.coreState; }
  getJokesState() { return this.jokesState; }
  getUiState() { return this.uiState; }
  getJoke() { return this.joke; }
  getJokes() { return this.jokes; }
  getSubmitPayload() { return this.submitPayload; }
  getSubmitResponse() { return this.submitResponse; }
}
