import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-odd',
    templateUrl: './odd.component.html',
    styles: [`
    div { padding: 1rem; background-color: wheat; }
    `]
})
export class OddComponent  {
    @Input() n: number;

}