import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Expense } from "./interfaces";

export type ExpensesByYear = [number, Expense[]];

@Injectable({providedIn: 'root'})
export class DataService {
    private allExpenses: Expense[] = [
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
    private expensesByYear = new BehaviorSubject<ExpensesByYear>([0, []]);
    selectedYear$ = this.expensesByYear.pipe(map(info => info[0]));
    expenses$ = this.expensesByYear.pipe(map(info => info[1]));

    constructor() {}

    initService() {
        this.selectYear(2022);
    }

    addExpense(expense: Expense) {
        this.allExpenses.push(expense);
        this.allExpenses.sort((a, b) => a.date > b.date ? 1 : -1);
        this.selectYear(expense.date.getFullYear());
    }

    selectYear(year: number) {
        this.expensesByYear.next(this.filterExepenses(year));
    }

    private filterExepenses(year: number) {
        return [year, this.allExpenses.filter(expense => expense.date.getFullYear() === year)] as ExpensesByYear;
    }
}