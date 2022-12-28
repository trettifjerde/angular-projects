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
    navigationSpinner = {visible: false, timer: null};
    fetchSpinner = {visible: false, timer: null};

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.recipesSubscription = this.store.select('recipes').subscribe(
            state => {
                this.state = state;
                this.setSpinnerTimer(state.recipeFetchInProgress, this.fetchSpinner);
                this.setSpinnerTimer(state.navigationInProgress, this.navigationSpinner);
            }
        )
    }

    ngOnDestroy(): void {
        this.recipesSubscription.unsubscribe();
    }

    clearFilter() {
        this.filterString = '';
    }

    setSpinnerTimer(inProgress: boolean, spinner: {visible:boolean, timer: any}) {
        if (inProgress && ! spinner.timer) {
            spinner.timer = setTimeout(() => spinner.visible = true, 200);
        }
        else if (!inProgress && spinner.timer) {
            spinner.visible = false;
            clearTimeout(spinner.timer);
            spinner.timer = null;
        }
    }
}