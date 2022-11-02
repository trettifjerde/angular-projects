import { Component } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient('Apple', 10),
        new Ingredient('Potato', 5)
    ]

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}