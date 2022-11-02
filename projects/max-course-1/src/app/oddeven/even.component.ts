import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-even',
    templateUrl: './even.component.html',
    styles: [`
    div {padding: 1rem; background-color: lightgray; }
    `]
})
export class EvenComponent  {
    @Input() n: number;
}