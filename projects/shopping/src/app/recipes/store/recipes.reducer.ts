import { Recipe } from "../recipe.model";

import * as recipesActions from './recipes.actions';

export interface RecipesState {
    recipes: Recipe[],
    fetched: boolean,
    error: Error
}

const initialState: RecipesState = {
    recipes: [],
    fetched: false,
    error: null
}

export function recipesReducer(state=initialState, action: recipesActions.RecipesAction) {
    switch(action.type) {
        case recipesActions.RECIPES_INIT:
        case recipesActions.START_ADD_RECIPE:
        case recipesActions.START_UPDATE_RECIPE:
            return {...state };
        case recipesActions.RECIPES_INIT_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                fetched: true,
                error: null
            }
        case recipesActions.RECIPES_INIT_FAIL:
            return {
                ...state,
                fetched: false,
                error: action.payload
            }
        case recipesActions.RECIPES_FETCH_SUCCESS:
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload],
                error: null                
            }
        case recipesActions.RECIPES_HTTP_FAIL:
            return {
                ...state, 
                error: action.payload
            }
        case recipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                error: null
            }
        case recipesActions.UPDATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes.filter(r => r.id != action.payload.id), action.payload],
                error: null
            }
        case recipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes.filter(r => r.id !== action.payload)],
                error: null
            }
        default:
            return state;
    }
}