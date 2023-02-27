import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer.newer';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import * as fromGeneral from './general.store';

export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState,
    auth: fromAuth.AuthState,
    recipes: fromRecipes.RecipesState,
    general: fromGeneral.GeneralState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer,
    general: fromGeneral.generalReducer
};
