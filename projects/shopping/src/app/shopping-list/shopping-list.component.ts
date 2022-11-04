import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingListService } from "../services/shopping-list.service";
import { Ingredient } from "../shared/ingredient.model";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[] = [];
    ingredientsSubscription: Subscription;

    constructor(private listService: ShoppingListService) {}

    ngOnInit(): void {
        this.ingredients = this.listService.getIngredients();
        this.ingredientsSubscription = this.listService.ingredientsUpdated.subscribe(
            (ings) => this.ingredients = ings
        );
    }

    ngOnDestroy(): void {
        this.ingredientsSubscription.unsubscribe();
    }
}