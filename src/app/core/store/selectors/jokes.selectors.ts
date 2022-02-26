import { JokesState } from "src/app/interfaces/jokes-state.interface";

export const getJokes = (state: JokesState) => state.jokes;
