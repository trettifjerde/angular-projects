import { Component } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
    selector: 'app-empty',
    templateUrl: './empty.component.html',
    styleUrls: ['./empty.component.css']
})
export class EmptyComponent {
    message: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data) => this.message = data['message']
        )
    }
}