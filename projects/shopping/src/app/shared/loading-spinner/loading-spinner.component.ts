import { Component } from "@angular/core";

@Component({
    selector: 'app-spinner',
    template: '<div class="spinner-cont"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {}