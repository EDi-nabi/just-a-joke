import { Action } from '@ngrx/store';
import { Joke } from 'src/app/interfaces/joke.interface';

export const ADD_JOKE = '[Jokes] Add single joke';
export const ADD_JOKES = '[Jokes] Add multiple jokes';
export const UPDATE_JOKE = '[Jokes] Update single joke';
export const REMOVE_JOKE = '[Jokes] Remove single joke';
export const API_GET_JOKES = '[Jokes API] Get jokes from server';
export const API_ADD_JOKE = '[Jokes API] Save joke to server';

export class AddJoke implements Action {
  readonly type: typeof ADD_JOKE = ADD_JOKE;
  constructor(public payload: { joke: Joke }) { }
}

export class AddJokes implements Action {
  readonly type: typeof ADD_JOKES = ADD_JOKES;
  constructor(public payload: { jokes: Joke[] }) { }
}

export class UpdateJoke implements Action {
  readonly type: typeof UPDATE_JOKE = UPDATE_JOKE;
  constructor(public payload: { joke: Joke }) { }
}

export class RemoveJoke implements Action {
  readonly type: typeof REMOVE_JOKE = REMOVE_JOKE;
  constructor(public payload: { jokeId: number }) { }
}

export class ApiGetJokes implements Action {
  readonly type: typeof API_GET_JOKES = API_GET_JOKES;
  constructor(public payload: { categories: string[], flags: string[], amount: number }) { }
}

export class ApiAddJoke implements Action {
  readonly type: typeof API_ADD_JOKE = API_ADD_JOKE;
  constructor(public payload: { joke: Joke }) { }
}

export type JokesActions = AddJoke | AddJokes | UpdateJoke | RemoveJoke | ApiGetJokes | ApiAddJoke;
