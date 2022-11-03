import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor() {
        this.ingredients = [
            new Ingredient('Apple', 10),
            new Ingredient('Potato', 5)
        ];
    }

    ingredientsUpdated = new EventEmitter<Ingredient[]>();

    private _addIngredient(ingredient: Ingredient) {
        const i = this.ingredients.findIndex(ing => ing.name === ingredient.name);
        if (i >= 0)
            this.ingredients[i].amount += ingredient.amount;
        else
            this.ingredients.push(ingredient);
    }

    addIngredient(ingredient: Ingredient) {
        this._addIngredient(ingredient);
        this.ingredientsUpdated.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ing => this._addIngredient(ing));
        this.ingredientsUpdated.emit(this.getIngredients());
    }

    getIngredients() {
        return this.ingredients.slice();
    }
}