import { createAction, props } from "@ngrx/store";
import { Expense } from "../interfaces";

export const addExpense = createAction(
    'ADD_EXPENSE',
    props<{expense: Expense}>()
)

export const selectYear = createAction(
    'SELECT_YEAR',
    props<{year: number}>()
)

export const filterExpenses = createAction(
    'FILTER_EXPENSES'
);