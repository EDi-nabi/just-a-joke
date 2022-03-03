import { UiState } from "src/app/interfaces/ui-state.interface";
import { appConfig } from "src/app/config/app.config";

export const uiInitialState: UiState = {
  ui: {
    itemsPerPage: appConfig.itemsPerPage,
    categories: ['Any'],
    order: 'asc',
  }
};
