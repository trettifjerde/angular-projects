import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ShoppingListService } from "../shopping-list.service";
import * as shlist from './shopping-list.actions';
import { of, switchMap, map, catchError } from 'rxjs';
import { setSubmitting, setToast } from "../../store/general.store";


@Injectable()
export class ShoppingListEffects {
    constructor(
        private actions$: Actions,
        private listService: ShoppingListService
    ) {}

    initShoppingList = createEffect(() => this.actions$.pipe(
        ofType(shlist.INIT_SHOPPING_LIST),
        switchMap(() => this.listService.fetchIngredients().pipe(
            map(ings => new shlist.FetchIngredients(ings)),
            catchError(error => of(setToast({toast: {message: error.message, isError: true}})))
        ))
    ))

    httpSuccess = createEffect(() => this.actions$.pipe(
        ofType(shlist.FETCH_INGREDIENTS),
        map(() => setSubmitting({status: false}))
    ))

    flashSuccess = createEffect(() => this.actions$.pipe(
        ofType(shlist.ADD_INGREDIENT, shlist.UPDATE_INGREDIENT, shlist.SET_UPDATED_INGREDIENTS, shlist.DELETE_INGREDIENT),
        map((action: shlist.ShoppingListAction) => {
            let message = 'Success';
            switch(action.type) {
                case shlist.ADD_INGREDIENT:
                    message = 'Item added to shopping list'
                    break;
                case shlist.UPDATE_INGREDIENT:
                    message = 'Item updated';
                    break;
                case shlist.SET_UPDATED_INGREDIENTS:
                    message = 'Ingredients added to shopping list'
                    break;
                case shlist.DELETE_INGREDIENT:
                    message = 'Item deleted';
                    break;
            }
            return setToast({toast: {message, isError: false}})
        })
    ))

}