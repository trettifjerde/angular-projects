export interface Expense {
    title: string,
    id?: number,
    amount: number,
    date: Date
}

export interface ChartBar {
    label: string,
    value: number
}

export interface ChartInfo {
    chartBars: ChartBar[],
    maxValue: number
}