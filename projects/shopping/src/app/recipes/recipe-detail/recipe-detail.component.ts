import { Component, Input, OnInit } from "@angular/core";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;

    constructor(private recipeService: RecipesService) {}

    ngOnInit(): void {
        this.recipe = this.recipeService.getRecipes()[0];
        this.recipeService.recipeSelected.subscribe(
            (recipe) => this.recipe = recipe
        )
    }

    toShoppingList() {
        this.recipeService.toShoppingList(this.recipe.ingredients);
    }
}