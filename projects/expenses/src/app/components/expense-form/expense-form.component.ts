import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataService } from "../../data-service";
//import { Store } from "@ngrx/store";
import { Expense } from "../../interfaces";
//import { AppState } from "../../store/app.reducer";
//import { addExpense } from "../../store/app.actions";

const MIN_DATE = new Date('2021-01-01');
const MAX_DATE = new Date();

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['expense-form.component.css']
})
export class ExpenseForm {

    @ViewChild('form') form: NgForm;

    model = {title: '', amount: '', date: new Date().toISOString().slice(0, 10)};
    isFormVisible = false;

    //constructor(private store: Store<{state: AppState}>) {}
    constructor(private dataService: DataService) {}

    setFormVisible(flag: boolean) {
        this.isFormVisible = flag; 
    }

    setDateMax() {
        return MAX_DATE;
    }

    onSubmit() {
        if (this.form.valid) {
            const date = new Date(this.model.date);

            if (date >= MIN_DATE && date <= MAX_DATE) {
                const expense: Expense = {title: this.model.title.trim(), amount: +this.model.amount, date: new Date(date)};
                
                //this.store.dispatch(addExpense({expense: expense}));
                this.dataService.addExpense(expense);

                this.model = {title: '', amount: '', date: new Date().toISOString().slice(0, 10)};
                this.form.resetForm(this.model);
            }
            else {
                this.form.controls['date'].setErrors({'invalid': true});
            }
        }
    }
}