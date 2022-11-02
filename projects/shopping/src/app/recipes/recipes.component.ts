import { Component, Output } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html'
})
export class RecipesComponent {
    recipe: Recipe;
    
    selectRecipe(r: Recipe) {
        this.recipe = r;
    }
}