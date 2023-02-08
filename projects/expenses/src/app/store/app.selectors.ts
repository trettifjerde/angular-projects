import { AppState } from "./app.reducer";

export const selectExpenses = (store: {state: AppState}) => store.state.filteredExpenses;
