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

function sortIngs(ings: Ingredient[]) {
    let ingreds = ings.filter(ing => ing.name);
    console.log(ingreds);
    ingreds.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
    return ingreds;
}

export function shoppingListReducer(state=initialShoppingList, action: shlist.ShoppingListAction) {
    switch(action.type) {
        case shlist.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: sortIngs([...state.ingredients, action.payload])
            };
        case shlist.SET_UPDATED_INGREDIENTS:
            return {
                ...state,
                ingredients: sortIngs(action.payload),
                isSubmitting: false
            }
        case shlist.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: sortIngs(state.ingredients.map(i => i.id === action.payload.id ? action.payload : i))
            }
        case shlist.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.payload),
                ingredientBeingEdited: state.ingredientBeingEdited?.id === action.payload ? null : state.ingredientBeingEdited
            }
        case shlist.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: sortIngs(action.payload),
                fetched: true
            }
        case shlist.CLEAR_INGREDIENTS:
            return {...initialShoppingList}
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