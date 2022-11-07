import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription, throwIfEmpty } from "rxjs";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('form') form: NgForm;
    ingredientId : number | null = null;
    edittingSubscription: Subscription;

    constructor(private listService: ShoppingListService) {}

    ngOnInit() {
        this.edittingSubscription = this.listService.ingredientBeingEditted.subscribe(
            ([ing, i]) => {
                this.ingredientId = i;
                this.form.setValue({'name': ing.name, 'amount': ing.amount});
            }
        )
    }

    ngOnDestroy() {
        this.edittingSubscription.unsubscribe();
    }

    addIngredient() {
        if (this.ingredientId !== null) {
            this.listService.updateIngredient(this.ingredientId, new Ingredient(this.form.value.name, this.form.value.amount));
        }
        else {
            this.listService.addIngredient(new Ingredient(this.form.value.name, this.form.value.amount));
        }
        this.clearForm();
    }

    clearForm() {
        this.form.reset();
        this.ingredientId = null;
    }
}