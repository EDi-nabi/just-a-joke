import { JokesState } from "./jokes-state.interface";
import { UiState } from "./ui-state.interface";

export interface CoreState {
  jokes: JokesState;
  ui: UiState;
}
