import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, Subscription, switchMap, take } from "rxjs";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as recipeActions from "../store/recipes.actions";
import { RecipesState } from "../store/recipes.reducer";
import { recipeListAnimations, recipeItemAnimations } from "./recipe-list.animations";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    animations: [recipeListAnimations, recipeItemAnimations]
})
export class RecipeListComponent implements OnInit, OnDestroy {
    @Input('filterString') filterString: string;
    stateSub: Subscription;
    recipes: Recipe[];
    fetching: boolean;
    allFetched: boolean;
    spinnerVisible: boolean;
    spinnerTimer: any;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.stateSub = this.store.select('recipes').subscribe(
            state => {
                this.recipes = state.recipes;
                this.allFetched = state.allRecipesFetched;
                this.setFetchStatus(state.recipeFetchInProgress);
            }
        );
    }

    ngOnDestroy(): void {
        this.stateSub.unsubscribe();
    }

    setFetchStatus(loading: boolean) {
        this.fetching = loading;
        if (loading && !this.spinnerTimer) 
            this.spinnerTimer = setTimeout(() => this.spinnerVisible = true, 100);
        else if (!loading && this.spinnerTimer) {
            clearTimeout(this.spinnerTimer);
            this.spinnerTimer = null;
            this.spinnerVisible = false;
        }
    }

    loadMoreRecipes() {
        this.store.dispatch(new recipeActions.StartFetchRecipes(this.recipes[this.recipes.length - 1].id))
    }
}