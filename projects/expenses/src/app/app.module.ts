import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ExpenseChartBar } from './components/expense-chart/expense-chart-bar/expense-chart-bar.component';
import { ExpenseChart } from './components/expense-chart/expense-chart.component';
import { ExpenseFilterComponent } from './components/expense-filter/expense-filter.component';
import { ExpenseForm } from './components/expense-form/expense-form.component';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
//import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    ExpenseFilterComponent,
    ExpenseChart,
    ExpenseChartBar,
    ExpenseForm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //StoreModule.forRoot({state: appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
