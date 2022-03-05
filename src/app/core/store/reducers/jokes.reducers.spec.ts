import { MockData } from 'src/app/testing/mock-data';
import { jokesReducer } from './jokes.reducers';
import { jokesInitialState } from './../state/jokes.state';
import * as JokesActions from './../actions/jokes.actions';

describe('JokesReducers', () => {

  describe('addJoke action', () => {
    it('should add joke', () => {
      const initialState = jokesInitialState;
      const mockData = new MockData();
      const joke = mockData.getJoke();
      const action = JokesActions.addJoke({ joke });
      const state = jokesReducer(initialState, action);
      expect(state.jokes).toHaveSize(1);
    });
  });

  describe('addJokes action', () => {
    it('should add jokes', () => {
      const initialState = jokesInitialState;
      const mockData = new MockData();
      const jokes = mockData.getJokes();
      const action = JokesActions.addJokes({ jokes });
      const state = jokesReducer(initialState, action);
      expect(state.jokes).toHaveSize(3);
    });
  });

  describe('sortJokes action', () => {
    it('should sort jokes', () => {
      const initialState = jokesInitialState;
      const mockData = new MockData();
      const jokes = mockData.getJokes();
      const action1 = JokesActions.addJokes({ jokes });
      let state = jokesReducer(initialState, action1);
      const action2 = JokesActions.sortJokes({ order: 'asc' });
      state = jokesReducer(state, action2);
      expect(state.jokes[0].id).toBeLessThan(state.jokes[1].id);
      expect(state.jokes[1].id).toBeLessThan(state.jokes[2].id);
    });
  });

  describe('updateJoke action', () => {
    it('should update joke', () => {
      const initialState = jokesInitialState;
      const mockData = new MockData();
      const joke = mockData.getJoke();
      const action1 = JokesActions.addJoke({ joke });
      let state = jokesReducer(initialState, action1);
      joke.id = 2;
      const action2 = JokesActions.updateJoke({ joke });
      state = jokesReducer(state, action2);
      expect(state.jokes[0].id).toEqual(2);
    });
  });

  describe('removeJoke action', () => {
    it('should remove joke', () => {
      const initialState = jokesInitialState;
      const mockData = new MockData();
      const jokes = mockData.getJokes();
      const action1 = JokesActions.addJokes({ jokes });
      let state = jokesReducer(initialState, action1);
      const action2 = JokesActions.removeJoke({ jokeId: 3 });
      state = jokesReducer(state, action2);
      expect(state.jokes).toHaveSize(2);
    });
  });
});
