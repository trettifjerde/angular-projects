import { Component, OnDestroy, ViewChild, ElementRef} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as shlist from '../store/shopping-list.actions';
import { ShoppingListService } from "../shopping-list.service";
import { Ingredient, IngredientRaw } from "../../shared/ingredient.interface";
import { AppState } from "../../store/app.reducer";
import { setSubmitting, setToast } from "../../store/general.store";


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnDestroy {
    ingredientSubscription: Subscription;
    model: Ingredient;
    @ViewChild('form') form : ElementRef;
    
    constructor(private listService: ShoppingListService, private store: Store<AppState>) {
        this.model = new Ingredient();
    }

    ngOnInit() {
        this.ingredientSubscription = this.store.select(store => store.shoppingList.ingredientBeingEdited).subscribe(
            ingredient => {
                this.model = ingredient ? new Ingredient({...ingredient}) : new Ingredient();
                if (ingredient) this.form.nativeElement.scrollIntoView({behavior: 'smooth'});                
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
        
        this.store.dispatch(setSubmitting({status: true}));

        (this.model.id ? 
            this.listService.updateIngredient(new Ingredient({...this.model})) : 
            this.listService.addIngredient(new IngredientRaw({...this.model})))
        .subscribe(() => this.clear());
    }
}