import { Component, OnDestroy} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as shlist from '../store/shopping-list.actions';
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient, IngredientRaw } from "../../shared/ingredient.interface";
import { AppState } from "../../store/app.reducer";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnDestroy {
    ingredientSubscription: Subscription;
    model: Ingredient;
    
    constructor(private listService: ShoppingListService, private store: Store<AppState>) {
        this.model = new Ingredient();
    }

    ngOnInit() {
        this.ingredientSubscription = this.store.select('shoppingList').subscribe(
            state => {
                this.model = state.ingredientBeingEdited ? new Ingredient({...state.ingredientBeingEdited}) : new Ingredient();
            }
        )
    }

    ngOnDestroy(): void {
        this.ingredientSubscription.unsubscribe();
        this.clear();
    }

    clear() {
        this.model = new Ingredient();
        this.store.dispatch(new shlist.StopEdit());
    }

    saveIngredient() {
        (this.model.id ? this.listService.updateIngredient(this.model) : this.listService.addIngredient(new IngredientRaw({...this.model}))).subscribe({
            next: () => this.clear(),
            error: err => console.log(err)
        });
    }
}