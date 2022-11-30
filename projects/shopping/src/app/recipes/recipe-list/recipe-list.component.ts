import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    @Input('filterString') filterString: string;
    recipesSubscription: Subscription;
    recipes: Recipe[];

    constructor(private recipeService: RecipesService, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.recipesSubscription = this.store.select('recipes').subscribe(
            state => this.recipes = state.recipes
        )
    }

    ngOnDestroy(): void {
        this.recipesSubscription.unsubscribe();
    }

    loadMoreRecipes() {
        this.recipeService.loadMoreRecipes();
    }
}