import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    @Input('filterString') filterString: string;
    recipes: Recipe[] = [];
    recipesUpdateSubsc: Subscription;

    constructor(private recipeService: RecipesService) {}

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.recipesUpdateSubsc = this.recipeService.recipesUpdated.subscribe(
            (recipes) => this.recipes = recipes
        );
    }

    ngOnDestroy(): void {
        this.recipesUpdateSubsc.unsubscribe();
    }
}