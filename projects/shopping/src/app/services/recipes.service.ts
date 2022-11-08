import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[] = [
        new Recipe({
            name: 'Taco', 
            description: 'Fresh and savoury', 
            imagePath: 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9ca9adfae4a04ecf8ac3275fcef25e7b.png',
            ingredients: [
                new Ingredient('Ground beef', 1),
                new Ingredient('Taco shells', 12),
                new Ingredient('Tomato sauce', 1)
            ]
        }),
        new Recipe({
            name: 'Paella', 
            description: 'Nourishing', 
            imagePath: 'https://iamafoodblog.b-cdn.net/wp-content/uploads/2012/07/paella-9174.jpg',
            ingredients: [
                new Ingredient('Onion', 1),
                new Ingredient('Garlic', 1),
                new Ingredient('Tomato', 5),
                new Ingredient('Bell pepper', 2),
                new Ingredient('Shrimp', 10)
            ]
        }),
        new Recipe({
            name: 'Burger', 
            description: 'Will make you full for a whole day!', 
            imagePath: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/5:4/w_3129,h_2503,c_limit/Smashburger-recipe-120219.jpg',
            ingredients: [
                new Ingredient('Patty', 1),
                new Ingredient('Buns', 2),
                new Ingredient('Onion', 1),
                new Ingredient('Cheese', 2),
                new Ingredient('Pickles', 3),
                new Ingredient('Salat', 1),
                new Ingredient('Ketchup', 1)
            ]
        })
    ];
    recipesUpdated = new Subject<Recipe[]>();

    constructor(private listService: ShoppingListService) {}

    addRecipe(recipe: Recipe) : number {
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.getRecipes());
        return this.recipes.length - 1;
    }

    getRecipes() {
        return this.recipes.slice();
    }
    
    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipesUpdated.next(this.getRecipes());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesUpdated.next(this.getRecipes());
    }

    toShoppingList(ingredients: Ingredient[]) {
        this.listService.addIngredients(ingredients);
    }

    isUniqueName(name: string, id: number | null) : boolean{
        const result = this.recipes.findIndex(r => r.name === name);
        if (result < 0) return true;
        else if (result === id) return true;
        else return false;
    }
}