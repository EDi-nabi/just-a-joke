import { createAction, props } from '@ngrx/store';
import { Joke } from 'src/app/interfaces/joke.interface';

export const addJoke = createAction(
  '[Jokes] Add single joke',
  props<{ joke: Joke }>(),
);

export const addJokes = createAction(
  '[Jokes] Add multiple jokes',
  props<{ jokes: Joke[], order: string }>(),
);

export const updateJoke = createAction(
  '[Jokes] Update single joke',
  props<{ joke: Joke }>(),
);

export const removeJoke = createAction(
  '[Jokes] Remove single joke',
  props<{ jokeId: number }>(),
);

export const sortJokes = createAction(
  '[Jokes] Sort jokes',
  props<{ order: string }>(),
);

export const apiGetJokes = createAction(
  '[Jokes API] Get jokes from server',
);

export const apiAddJoke = createAction(
  '[Jokes API] Save joke to server',
  props<{ joke: Joke }>(),
);
