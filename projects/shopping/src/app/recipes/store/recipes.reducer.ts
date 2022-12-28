import { Recipe } from "../recipe.model";

import * as recipesActions from './recipes.actions';

export interface RecipesState {
    recipes: Recipe[],
    fetched: boolean,
    allRecipesFetched: boolean,
    error: Error,
    navigationInProgress: boolean,
    recipeFetchInProgress: boolean
}

const initialState: RecipesState = {
    recipes: [],
    fetched: false,
    allRecipesFetched: false,
    error: null,
    navigationInProgress: false,
    recipeFetchInProgress: false
}

export function recipesReducer(state=initialState, action: recipesActions.RecipesAction) {
    switch(action.type) {
        case recipesActions.START_ADD_RECIPE:
        case recipesActions.START_UPDATE_RECIPE:
            return state;
        case recipesActions.RECIPES_INIT:
            return {
                ...state,
                error: null,
                recipeFetchInProgress: true
            }
        case recipesActions.RECIPES_INIT_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                recipeFetchInProgress: false,
                fetched: true,
                allRecipesFetched: action.payload.length < 3,
                error: null
            }
        case recipesActions.RECIPES_INIT_FAIL:
            return {
                ...state,
                recipeFetchInProgress: false,
                fetched: false,
                error: action.payload
            }
        case recipesActions.RECIPES_FETCH_STARTED:
            return {
                ...state,
                error: null,
                recipeFetchInProgress: true
            }
        case recipesActions.RECIPES_FETCH_SUCCESS:
            return {
                ...state,
                recipeFetchInProgress: false,
                allRecipesFetched: action.payload.length < 3,
                recipes: [...state.recipes, ...action.payload],
                error: null                
            }
        case recipesActions.RECIPES_HTTP_FAIL:
            return {
                ...state, 
                error: action.payload,
                recipeFetchInProgress: false
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

        case recipesActions.NAVIGATION_STARTED:
            return {
                ...state,
                error: null,
                navigationInProgress: true    
            }
        case recipesActions.NAVIGATION_COMPLETE:
            return {
                ...state,
                navigationInProgress: false
            }
        default:
            return state;
    }
}