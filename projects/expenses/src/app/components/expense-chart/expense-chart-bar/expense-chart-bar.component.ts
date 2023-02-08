import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-expense-chart-bar',
    template: `
        <div class="chart-bar__inner" [title]="'$' + barValue">
            <div class="chart-bar__fill" [ngStyle]="{height: barFillHeight}"></div>
        </div>
        <div class="chart-bar__label">{{ barLabel }}</div>
    `,
    styleUrls: ['./expense-chart-bar.component.css']
})
export class ExpenseChartBar implements OnChanges {
    @Input() barValue: number;
    @Input() maxValue: number;
    @Input() barLabel: string;
    barFillHeight = '0%';

    ngOnChanges(changes: SimpleChanges) {
        const v = 'barValue' in changes ? changes['barValue'].currentValue : this.barValue;
        const mV = 'maxValue' in changes ? changes['maxValue'].currentValue : this.maxValue;
        const barFill = mV > 0 ? Math.round(v / mV * 100) + '%' : '0%';
        this.barFillHeight = barFill;
    }


}