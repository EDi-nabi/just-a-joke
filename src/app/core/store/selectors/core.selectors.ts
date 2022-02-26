import { createFeatureSelector } from "@ngrx/store";
import { CoreState } from "src/app/interfaces/core-state.interface";

export const selectCoreState = createFeatureSelector<CoreState>('core');
