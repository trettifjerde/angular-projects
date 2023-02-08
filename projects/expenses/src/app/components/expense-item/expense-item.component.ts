import { Component, Input } from "@angular/core";
import { Expense } from "../../interfaces";

@Component({
    selector: 'app-expense-item',
    styleUrls: ['./expense-item.component.css'],
    template: `
        <li [id]="item.id">
            <div class="card item">
                <div class="expense-date">
                    <div class="expense-date__month">{{ item.date.toLocaleString('en', {month: 'long'})}}</div>
                    <div class="expense-date__day">{{ item.date.getDate()}}</div>
                    <div class="expense-date__year">{{ item.date.getFullYear() }}</div>
                </div>
                <div class="description">
                    <h2>{{ item.title }}</h2>
                    <div class="price">$ {{ item.amount }}</div>
                </div>
            </div>
        </li>
    `
})
export class ExpenseItemComponent  {
    @Input() item: Expense;
    
    constructor() {}
}