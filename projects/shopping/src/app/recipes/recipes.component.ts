import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { RecipesState } from "./store/recipes.reducer";
import { setSpinnerTimer } from "../shared/utils";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
    filterString = '';
    fetchedSub: Subscription;
    fetched: boolean;
    navigationSub: Subscription;
    navigationSpinner: {visible: boolean, timer: any} = {visible: false, timer: null};

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.fetchedSub = this.store.select(store => store.recipes.fetched).subscribe(
            fetched => this.fetched = fetched
        )
        this.navigationSub = this.store.select(store => store.recipes.navigationInProgress).subscribe(
            navigationInProgress => setSpinnerTimer(navigationInProgress, this.navigationSpinner)
        )
    }

    ngOnDestroy(): void {
        this.fetchedSub.unsubscribe();
    }

    clearFilter() {
        this.filterString = '';
    }
}