import { Joke } from "./joke.interface";

export interface JokesResponse {
  error: boolean;
  amount: number;
  jokes: Joke[];
}
