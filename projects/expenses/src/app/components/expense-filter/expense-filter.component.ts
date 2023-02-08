import { Component } from "@angular/core";
//import { Store } from "@ngrx/store";
//import { AppState } from "../../store/app.reducer";
//import { selectYear } from "../../store/app.actions";
import { DataService } from "../../data-service";

@Component({
    selector: 'app-expense-filter',
    styleUrls: ['./expense-filter.component.css'],
    template: `
    <div class='expenses-filter'>
        <div class='expenses-filter__control'>
            <label>Filter by year</label>
            <select [value]="selectedYear$|async" (change)="selectYear($event.target.value)">
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            </select>
        </div>
    </div>
    `
})
export class ExpenseFilterComponent {
    //selectedYear$: Observable<number> = this.store.select(store => store.state.selectedYear);

    //constructor(private store: Store<{state: AppState}>) {}

    selectedYear$ = this.dataService.selectedYear$;

    constructor(private dataService: DataService) {}

    selectYear(year: string) {
        this.dataService.selectYear(+year);
        //this.store.dispatch(selectYear({year: +year}));
    }
}