import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesState } from 'src/app/interfaces/jokes-state.interface'
import { jokesInitialState } from '../state/jokes.state'
import * as JokesActions from '../actions/jokes.actions';


export const jokesReducer = (state = jokesInitialState, action: any): JokesState => {
  let jokes: Joke[] = [];
  switch (action.type) {

    case JokesActions.addJoke.type:
      jokes = [...state.jokes];
      if (!jokes.find(joke => joke.id === action.joke.id)) {
        jokes.push(action.joke);
        return { ...state, jokes };
      }
      return state;

    case JokesActions.addJokes.type:
      if (action.jokes?.length) {
        jokes = [...action.jokes];
        return { ...state, jokes };
      }
      return state;

    case JokesActions.sortJokes.type:
      jokes = [...state.jokes];
      jokes.sort((a, b) => (a.id > b.id) ? 1 : -1);
      if (action.order === 'desc') {
        jokes.reverse();
      }
      return { ...state, jokes };

    case JokesActions.updateJoke.type:
      jokes = [...state.jokes].filter(joke => joke.id !== action.joke.id);
      return { ...state, jokes: [...jokes, action.joke] };

    case JokesActions.removeJoke.type:
      jokes = [...state.jokes].filter(joke => joke.id !== action.jokeId);
      return {
        ...state,
        jokes,
      };

    default:
      return state;
  }

}
