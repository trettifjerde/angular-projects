import { Component } from "@angular/core";

@Component({
    selector: 'app-oddeven',
    templateUrl: './oddeven.component.html',
    styles: [``]
})
export class OddEvenComponent {
    oddNumbers : number[] = []
    evenNumbers : number[] = []

    onNewNumberEmit(n: number) {
        if (n % 2 === 0)
            this.evenNumbers.push(n);
        else
            this.oddNumbers.push(n);
    }
}