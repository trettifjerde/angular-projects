import { Component } from "@angular/core";
//import { Store } from "@ngrx/store";
import { DataService } from "../../data-service";
//import { AppState } from "../../store/app.reducer";

@Component({
    selector: 'app-expense-list',
    template: `
        <ul class='expenses-list'>
            <app-expense-item *ngFor="let item of expenses$|async" [item]="item"></app-expense-item>
        </ul>
        <h2 *ngIf="(expenses$|async).length === 0" class='expenses-list__fallback'>No expenses found</h2>
    `,
    styles: [`
        .expenses-list {
            list-style: none;
            padding: 0;
        }
        
        .expenses-list__fallback {
            color: white;
            text-align: center;
        }
    `]
})
export class ExpenseListComponent {
    //expenses$: Observable<Expense[]> = this.store.select(store => store.state.filteredExpenses);

    //constructor(private store: Store<{state: AppState}>) {}

    constructor(private dataService: DataService) {}
    expenses$ = this.dataService.expenses$;
    
}