import { Component, OnDestroy, ViewChild} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as shlist from '../store/shopping-list.actions';
import { ShoppingListService } from "../../services/shopping-list.service";
import { AppState } from "../store/shopping-list.reducer";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnDestroy {
    @ViewChild('form') form: NgForm;
    ingredientSubscription: Subscription;
    id: string;
    
    constructor(private listService: ShoppingListService, private store: Store<AppState>) {}

    ngOnInit() {
        this.ingredientSubscription = this.store.select('shoppingList').subscribe(
            state => {
                if (state.ingredientBeingEdited) {
                    const {name, amount, unit, id} = state.ingredientBeingEdited;
                    this.id = id;
                    this.form.setValue({name: name, amount: amount, unit: unit ? unit : ''});
                }
                else {
                    this.id = null;
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.ingredientSubscription.unsubscribe();
        this.clear();
    }

    clear() {
        this.form.reset();
        this.store.dispatch(new shlist.StopEdit());
    }

    saveIngredient() {
        (this.id ? this.listService.updateIngredient(this.id, this.form.value) : this.listService.addIngredient(this.form.value)).subscribe({
            next: () => this.clear(),
            error: err => console.log(err)
        })
    }

}