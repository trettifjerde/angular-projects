import { createReducer, on } from "@ngrx/store";
import * as appActions from "./app.actions";
import { Expense } from "../interfaces";


const initialExpenses: Expense[] = [
    {
      title: 'Car Insurance',
      amount: 278.67,
      date: new Date(2022, 1, 28),
      id: 1
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 2, 1),
      id: 2
    },
    {
      title: 'Groceries',
      amount: 26.8,
      date: new Date(2022, 2, 15),
      id: 3
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 3, 1),
      id: 4
    },
];


export interface AppState {
    allExpenses: Expense[],
    filteredExpenses: Expense[],
    nextExpenseId: number,
    selectedYear: number
}

const initialState: AppState = {
    selectedYear: 2022,
    allExpenses: initialExpenses,
    filteredExpenses: initialExpenses.filter(exp => exp.date.getFullYear() === 2022),
    nextExpenseId: initialExpenses.length + 1,
}

const filterExpenses = (expenses: Expense[], year: number) => {
    return expenses.filter(expense => expense.date.getFullYear() === year);
}

export const appReducer = createReducer(initialState, 
    on(appActions.addExpense, 
        (state, {expense}) => {
            const updatedExpenses = [...state.allExpenses, {...expense, id: state.nextExpenseId }].sort((a, b) => a.date > b.date ? 1 : -1);
            const currentYear = expense.date.getFullYear();

            return {
                ...state, 
                allExpenses: updatedExpenses, 
                selectedYear: currentYear,
                filteredExpenses: filterExpenses(updatedExpenses, currentYear),
                nextExpenseId: state.nextExpenseId + 1
            }
        }
    ),
    on(appActions.selectYear,
        (state, {year}) => {
            return {
                ...state,
                selectedYear: year,
                filteredExpenses: filterExpenses(state.allExpenses, year)
            }
        }
    )
);