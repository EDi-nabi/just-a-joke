import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesState } from 'src/app/interfaces/jokes-state.interface'
import { jokesInitialState } from '../state/jokes.state'
import * as JokesActions from '../actions/jokes.actions';


export const JokesReducer = (state = jokesInitialState, action: JokesActions.JokesActions): JokesState => {
  let jokes: Joke[] = [];
  switch (action.type) {

    case JokesActions.ADD_JOKE:
      jokes = [...state.jokes];
      if (!jokes.find(joke => joke.id === action.payload.joke.id)) {
        jokes.push(action.payload.joke);
        return { ...state, jokes };
      }
      return state;

    case JokesActions.ADD_JOKES:
      if (action.payload.jokes.length) {
        jokes = [...state.jokes].filter(joke => {
          let result = false;
          action.payload.jokes.forEach(newJoke => {
            if (joke.id === newJoke.id) result = true;
          });
          return result;
        });
        return { ...state, jokes: [...jokes, ...action.payload.jokes] };
      }
      return state;

    case JokesActions.UPDATE_JOKE:
      jokes = [...state.jokes].filter(joke => joke.id !== action.payload.joke.id);
      return { ...state, jokes: [...jokes, action.payload.joke] };

    case JokesActions.REMOVE_JOKE:
      jokes = [...state.jokes].filter(joke => joke.id !== action.payload.jokeId);
      return {
        ...state,
        jokes,
      };

    default:
      return state;

  }
}
