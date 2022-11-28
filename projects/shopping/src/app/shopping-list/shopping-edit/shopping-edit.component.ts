import { Component, OnDestroy} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as shlist from '../store/shopping-list.actions';
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.interface";
import { AppState } from "../../store/app.reducer";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnDestroy {
    ingredientSubscription: Subscription;
    model: Ingredient;
    
    constructor(private listService: ShoppingListService, private store: Store<AppState>) {
        this.model = this.getCleanModel();
    }

    ngOnInit() {
        this.ingredientSubscription = this.store.select('shoppingList').subscribe(
            state => {
                this.model = state.ingredientBeingEdited ? {...state.ingredientBeingEdited} : this.getCleanModel()
            }
        )
    }

    ngOnDestroy(): void {
        this.ingredientSubscription.unsubscribe();
        this.clear();
    }

    getCleanModel() : Ingredient {
        return {name: '', amount: null, id: null, unit: ''};
    }

    clear() {
        this.model = this.getCleanModel();
        this.store.dispatch(new shlist.StopEdit());
    }

    saveIngredient() {
        (this.model.id ? this.listService.updateIngredient(this.model) : this.listService.addIngredient(this.model)).subscribe({
            next: () => this.clear(),
            error: err => console.log(err)
        });
    }
}