import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { RecipesState } from "./store/recipes.reducer";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
    filterString = '';
    recipesSubscription: Subscription;
    state: RecipesState;
    navigationSpinnerTimer: any;
    pageSpinnerTimer: any;
    isNavigationSpinnerVisible: boolean;
    isPageSpinnerVisible: boolean;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.recipesSubscription = this.store.select('recipes').subscribe(
            state => {
                this.state = state;
                this.setNavigationSpinnerTimer(state.navigationInProgress);
                this.setPageSpinnerTimer(!state.error && !state.fetched);
            }
        )
    }

    ngOnDestroy(): void {
        this.recipesSubscription.unsubscribe();
    }

    clearFilter() {
        this.filterString = '';
    }

    setNavigationSpinnerTimer(inProgress: boolean) {
        if (inProgress && ! this.navigationSpinnerTimer) {
            this.navigationSpinnerTimer = setTimeout(() => this.isNavigationSpinnerVisible = true, 200);
        }
        else if (!inProgress && this.navigationSpinnerTimer) {
            this.isNavigationSpinnerVisible = false;
            clearTimeout(this.navigationSpinnerTimer);
            this.navigationSpinnerTimer = null;
        }
    }

    setPageSpinnerTimer(on: boolean) {
        if (on) 
            this.pageSpinnerTimer = setTimeout(() => this.isPageSpinnerVisible = true, 200);
        else {
            this.isPageSpinnerVisible = false;
            clearTimeout(this.pageSpinnerTimer);
            this.pageSpinnerTimer = null;
        }
    }

}