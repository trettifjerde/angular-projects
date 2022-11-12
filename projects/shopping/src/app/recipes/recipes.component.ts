import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Component } from "@angular/core";
import { DBInterseptorService } from "../services/db-interseptor.service";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: DBInterseptorService, multi: true}]
})
export class RecipesComponent {
    constructor() {}
    filterString = '';

    clearFilter() {
        this.filterString = '';
    }

}