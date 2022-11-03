import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {
    errorMsg = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        //this.errorMsg = this.route.snapshot.data['message'];
        this.route.data.subscribe(
            (data) => this.errorMsg = data['message']
        )
    }
}