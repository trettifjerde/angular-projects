import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;

    constructor(private recipeService: RecipesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(
            (params) => this.recipe = this.recipeService.getRecipe(+params['id'])
        )
    }

    toShoppingList() {
        this.recipeService.toShoppingList(this.recipe.ingredients);
        return false;
    }
}