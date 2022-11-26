import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ShoppingListService } from "../../services/shopping-list.service";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('form') form: NgForm;
    edittingSubscription: Subscription;
    i: number | null = null;

    constructor(private listService: ShoppingListService) {}

    ngOnInit() {
        this.edittingSubscription = this.listService.ingredientBeingEditted.subscribe(
            ([i, ing]) => {
                this.i = i;
                this.form.setValue({name: ing.name, amount: ing.amount, unit: ing.unit});
            }
        )
    }

    ngOnDestroy() {
        this.edittingSubscription.unsubscribe();
    }

    saveIngredient() {
        if (this.i !== null) {
            this.listService.updateIngredient(this.i, this.form.value);
        }
        else {
            this.listService.addIngredient(this.form.value);
        }
        this.clearForm();
    }

    clearForm() {
        this.form.reset();
        this.i = null;
    }
}