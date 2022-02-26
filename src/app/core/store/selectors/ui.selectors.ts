import { UiState } from "src/app/interfaces/ui-state.interface";

export const getUi = (state: UiState) => state.ui;
export const getItemsPerPage = (state: UiState) => state.ui.itemsPerPage;
