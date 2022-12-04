import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as recipeActions from "../store/recipes.actions";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    @Input('filterString') filterString: string;
    recipesSubscription: Subscription;
    recipes: Recipe[];
    allRecipesFetched: boolean;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.recipesSubscription = this.store.select('recipes').subscribe(
            state => {
                this.recipes = state.recipes;
                this.allRecipesFetched = state.allRecipesFetched;
            }
        )
    }

    ngOnDestroy(): void {
        this.recipesSubscription.unsubscribe();
    }

    loadMoreRecipes() {
        this.store.dispatch(new recipeActions.StartFetchRecipes(this.recipes[this.recipes.length - 1].id));
    }
}