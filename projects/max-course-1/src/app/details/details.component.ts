import { Component } from "@angular/core";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styles: [`
    .hidden {display: none;}
    .blue { background-color: blue; color: white; }
    `]
})
export class DetailsComponent {
    detailsShown = false;
    secretDetails = 'Secret password is MUHSIK';
    clicks: number[] = [];

    getButtonText() {
        return this.detailsShown ? 'Hide details' : 'Display details';
    }

    toggleDetails() {
        this.detailsShown = !this.detailsShown;
        this.clicks.push(this.clicks.length + 1);
    }
}