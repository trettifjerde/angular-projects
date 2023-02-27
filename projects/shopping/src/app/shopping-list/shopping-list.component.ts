import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';

import * as shlist from './store/shopping-list.actions';
import { ShoppingListService } from "../services/shopping-list.service";
import { ShoppingListState } from "./store/shopping-list.reducer";
import { Ingredient } from "../shared/ingredient.interface";
import { AppState } from "../store/app.reducer";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    sub: Subscription;
    ingredients: Ingredient[];
    fetched: boolean;

    @ViewChild('ingredientsCont') ingredientsCont: ElementRef;

    constructor(
        private listService: ShoppingListService, 
        private renderer: Renderer2,
        private store: Store<AppState>
        ) {}

    ngOnInit(): void {
        this.sub = this.store.select('shoppingList').subscribe(
            state => {
                this.fetched = state.fetched;
                this.ingredients = state.ingredients;

                if (!state.fetched) {
                    this.listService.fetchIngredients();
                }
            })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    deleteItem(id: string, i: number) {
        if (confirm('Delete item?'))
        {
            const el = this.ingredientsCont.nativeElement.querySelectorAll('.ingredient')[i];
            this.renderer.removeClass(el, 'interactive');
            this.listService.deleteIngredient(id);
        }
    }

    editItem(ing: Ingredient) {
        this.store.dispatch(new shlist.StartEdit(ing));
    }

    getIngredInfo(ing: Ingredient) {
        let info = ing.name;
        if (ing.amount) {
            info += ` (${ing.amount}`;
            if (ing.unit) {
                info += ` ${ing.unit}`;
            }
            info += ')';
        }
        return info;
    }

}