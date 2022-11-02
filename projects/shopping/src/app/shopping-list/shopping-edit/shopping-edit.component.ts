import { Component, EventEmitter, Output } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent {
    name = '';
    amount = 0;
    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    addIngredient() {
        this.ingredientAdded.emit(new Ingredient(this.name, this.amount));
        this.clearForm();
    }

    clearForm() {
        this.name = '';
        this.amount = 0;
    }
}