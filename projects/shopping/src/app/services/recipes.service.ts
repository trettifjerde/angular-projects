import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[] = [
        new Recipe(
            'Taco', 
            'Fresh and savoury', 
            'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9ca9adfae4a04ecf8ac3275fcef25e7b.png',
            [
                new Ingredient('Ground beef', 1),
                new Ingredient('Taco shells', 12),
                new Ingredient('Tomato sauce', 1)
            ]),
        new Recipe(
            'Paella', 
            'Nourishing', 
            'https://iamafoodblog.b-cdn.net/wp-content/uploads/2012/07/paella-9174.jpg',
            [
                new Ingredient('Onion', 1),
                new Ingredient('Garlic', 1),
                new Ingredient('Tomato', 5),
                new Ingredient('Bell pepper', 2),
                new Ingredient('Shrimp', 10)
            ])
    ];
    recipesUpdated = new EventEmitter<Recipe[]>();

    selectedRecipe: Recipe;

    constructor(private listService: ShoppingListService) {}

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdated.emit(this.getRecipes());
    }

    getRecipes() {
        return this.recipes.slice();
    }
    
    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    toShoppingList(ingredients: Ingredient[]) {
        this.listService.addIngredients(ingredients);
    }

}