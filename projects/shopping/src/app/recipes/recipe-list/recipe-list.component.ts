import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
    @Output() onRecipeSelect = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('Taco', 'Fresh and savoury', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9ca9adfae4a04ecf8ac3275fcef25e7b.png'),
        new Recipe('Paella', 'Nourishing', 'https://iamafoodblog.b-cdn.net/wp-content/uploads/2012/07/paella-9174.jpg')
    ];

    selectRecipe(recipe: Recipe) {
        this.onRecipeSelect.emit(recipe);
    }

    ngOnInit(): void {
        this.selectRecipe(this.recipes[0]);
    }
}