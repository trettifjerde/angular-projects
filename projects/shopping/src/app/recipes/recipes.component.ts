import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../store/app.reducer";
import { RecipesState } from "./store/recipes.reducer";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
    filterString = '';
    recipes$: Observable<RecipesState>

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.recipes$ = this.store.select('recipes');
    }

    clearFilter() {
        this.filterString = '';
    }

}