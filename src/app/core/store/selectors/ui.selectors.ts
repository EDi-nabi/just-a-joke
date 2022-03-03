import { UiState } from "src/app/interfaces/ui-state.interface";

export const getUi = (state: UiState) => state.ui;
export const getItemsPerPage = (state: UiState) => state.ui.itemsPerPage;
export const getCategories = (state: UiState) => state.ui.categories;
export const getOrder = (state: UiState) => state.ui.order;
