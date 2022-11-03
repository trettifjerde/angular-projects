import { Component, EventEmitter, Output } from "@angular/core";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent {
    name = '';
    amount = 0;

    constructor(private listService: ShoppingListService) {}

    addIngredient() {
        this.listService.addIngredient({name: this.name, amount: this.amount});
        this.clearForm();
    }

    clearForm() {
        this.name = '';
        this.amount = 0;
    }
}