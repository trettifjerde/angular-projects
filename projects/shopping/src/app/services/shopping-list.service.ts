import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [];
    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredientBeingEditted = new Subject<[Ingredient, number]>();

    constructor() {
        this.ingredients = [
            new Ingredient('Apple', 10),
            new Ingredient('Potato', 5)
        ];
    }

    private _addIngredient(ingredient: Ingredient) {
        const i = this.ingredients.findIndex(ing => ing.name === ingredient.name);
        if (i >= 0)
            this.ingredients[i].amount += ingredient.amount;
        else
            this.ingredients.push(ingredient);
    }

    addIngredient(ingredient: Ingredient) {
        this._addIngredient(ingredient);
        this.ingredientsUpdated.next(this.getIngredients());
    }

    updateIngredient(i: number, ingredient: Ingredient) {
        this.ingredients[i] = ingredient;
        this.ingredientsUpdated.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ing => this._addIngredient(ing));
        this.ingredientsUpdated.next(this.getIngredients());
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(i: number) : Ingredient {
        return new Ingredient(this.ingredients[i].name, this.ingredients[i].amount);
    }

    deleteIngredient(i: number) {
        this.ingredients.splice(i, 1);
        this.ingredientsUpdated.next(this.getIngredients());
    }

    startEditting(i: number) {
        this.ingredientBeingEditted.next([this.getIngredient(i), i]);
    }
}