import { Ingredient } from "../../shared/ingredient.interface";
import * as shlist from "./shopping-list.actions";

export interface ShoppingListState {
    ingredients: Ingredient[],
    ingredientBeingEdited: Ingredient,
    fetched: boolean
}

const initialShoppingList: ShoppingListState = {
    ingredients: [],
    ingredientBeingEdited: null,
    fetched: false
};

export function shoppingListReducer(state=initialShoppingList, action: shlist.ShoppingListAction) {
    switch(action.type) {
        case shlist.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case shlist.ADD_INGREDIENTS:
            const toExclude = action.payload.map(i => i.id);
            return {
                ...state,
                ingredients: [...state.ingredients.filter(i => !toExclude.includes(i.id)), ...action.payload],
                isSubmitting: false
            }
        case shlist.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map(i => i.id === action.payload.id ? action.payload : i)
            }
        case shlist.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.payload),
            }
        case shlist.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                fetched: true
            }
        case shlist.CLEAR_INGREDIENTS:
            return {
                ...state,
                ingredients: [],
            }
        case shlist.START_EDIT:
            return {
                ...state,
                ingredientBeingEdited: action.payload
            }
        case shlist.STOP_EDIT:
            return {
                ...state,
                ingredientBeingEdited: null
            }
        default:
            return state;
    }
}