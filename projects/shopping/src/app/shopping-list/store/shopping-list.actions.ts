import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.interface';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const INIT_SHOPPING_LIST = 'INIT_SHOPPING_LIST';
export const SET_UPDATED_INGREDIENTS = 'SET_UPDATED_INGREDIENTS';

export class InitShoppingList implements Action {
    readonly type = INIT_SHOPPING_LIST;
}

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    
    constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor (public payload: string) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor (public payload: Ingredient) {}
}

export class SetUpdatedIngredients implements Action {
    readonly type = SET_UPDATED_INGREDIENTS;
    constructor (public payload: Ingredient[]) {}
}

export class FetchIngredients implements Action {
    readonly type = FETCH_INGREDIENTS;
    constructor (public payload: Ingredient[]) {}
}

export class ClearIngredients implements Action {
    readonly type = CLEAR_INGREDIENTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: Ingredient) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListAction = AddIngredient | SetUpdatedIngredients | UpdateIngredient | DeleteIngredient | FetchIngredients | ClearIngredients | StartEdit | StopEdit | InitShoppingList;