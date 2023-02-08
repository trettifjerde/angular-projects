import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data-service";
//import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { ChartBar } from "../../interfaces";
//import { AppState } from "../../store/app.reducer";
//import { selectExpenses } from "../../store/app.selectors";

const initialChartBars: ChartBar[] = [
    {label: 'Jan', value: 0}, 
    {label: 'Feb', value: 0}, 
    {label: 'Mar', value: 0}, 
    {label: 'Apr', value: 0}, 
    {label: 'May', value: 0}, 
    {label: 'Jun', value: 0}, 
    {label: 'Jul', value: 0}, 
    {label: 'Aug', value: 0}, 
    {label: 'Sep', value: 0}, 
    {label: 'Oct', value: 0}, 
    {label: 'Nov', value: 0}, 
    {label: 'Dec', value: 0}, 
];

@Component({
    selector: 'app-expense-chart',
    templateUrl: './expense-chart.component.html',
    styleUrls: ['./expense-chart.component.css']
})
export class ExpenseChart implements OnInit {

    chartBars: ReadonlyArray<ChartBar> = initialChartBars;
    maxValue = 0
    stateSub: Subscription;

    // constructor(private store: Store<{state: AppState}>) {}

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        //this.stateSub = this.store.select(selectExpenses).subscribe(
        this.stateSub = this.dataService.expenses$.subscribe(
            expenses => {
                this.chartBars.forEach(bar => bar.value = 0);
                expenses.forEach(expense => this.chartBars[expense.date.getMonth()].value += expense.amount);
                this.maxValue = Math.max(...this.chartBars.map(b => b.value));
            }
        )
    }

}