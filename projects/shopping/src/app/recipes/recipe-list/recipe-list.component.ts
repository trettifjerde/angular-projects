import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, Subscription, switchMap, take } from "rxjs";
import { setSpinnerTimer } from "../../shared/utils";
import { AppState } from "../../store/app.reducer";
import { setSubmitting } from "../../store/general.store";
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
    recipesSub: Subscription;
    recipeFetchInProgress: Subscription;
    allRecipesFetched$: Observable<boolean>;
    recipes: Recipe[];
    spinner: {visible: boolean, timer: any} = {visible: false, timer: null};

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.allRecipesFetched$ = this.store.select(store => store.recipes.allRecipesFetched);
        this.recipesSub = this.store.select(store => store.recipes.recipes).subscribe(
            recipes => this.recipes = recipes);

        this.recipeFetchInProgress = this.store.select(store => store.recipes.recipeFetchInProgress).subscribe(
            inProgress => setSpinnerTimer(inProgress, this.spinner));
    }

    ngOnDestroy(): void {
        this.recipeFetchInProgress.unsubscribe();
        this.recipesSub.unsubscribe();
    }

    loadMoreRecipes() {
        this.store.dispatch(new recipeActions.StartFetchRecipes(this.recipes[this.recipes.length - 1].id))
    }
}