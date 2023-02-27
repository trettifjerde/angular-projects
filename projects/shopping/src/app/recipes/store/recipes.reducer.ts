import { Recipe } from "../recipe.model";

import * as recipesActions from './recipes.actions';

export interface RecipesState {
    // With firebase dabase recipes and cache entries will be identical
    // But with a more efficent database 'recipes' entry would hold a small piece of info for recipe list item
    // While cache would contain the full information on a recipe to be used in recipe form component
    recipes: Recipe[], 
    cache: {[id: string]: Recipe}, 
    fetched: boolean,
    allRecipesFetched: boolean,
    navigationInProgress: boolean,
    recipeFetchInProgress: boolean
}

const initialState: RecipesState = {
    recipes: [],
    cache: {},
    fetched: false,
    allRecipesFetched: false,
    navigationInProgress: false,
    recipeFetchInProgress: false
}

export function recipesReducer(state=initialState, action: recipesActions.RecipesAction) {
    switch(action.type) {
        case recipesActions.RECIPES_INIT:
        case recipesActions.RECIPES_FETCH_STARTED:
            return {
                ...state,
                recipeFetchInProgress: true
            }
        case recipesActions.RECIPES_INIT_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                recipeFetchInProgress: false,
                fetched: true,
                allRecipesFetched: action.payload.length < 3,
            }
        case recipesActions.RECIPES_FETCH_SUCCESS:
            return {
                ...state,
                recipeFetchInProgress: false,
                allRecipesFetched: action.payload.length < 3,
                recipes: [...state.recipes, ...action.payload],               
            }
        case recipesActions.RECIPES_INIT_FAIL:
        case recipesActions.RECIPES_HTTP_FAIL:
            return {
                ...state, 
                recipeFetchInProgress: false
            }
        case recipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
            }
        case recipesActions.UPDATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes.filter(r => r.id != action.payload.id), action.payload],
            }
        case recipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes.filter(r => r.id !== action.payload)],
            }

        case recipesActions.NAVIGATION_STARTED:
            return {
                ...state,
                navigationInProgress: true    
            }
        case recipesActions.NAVIGATION_COMPLETE:
            return {
                ...state,
                navigationInProgress: false
            }
        case recipesActions.CACHE_RECIPE:
            const newCache = {...state.cache};
            newCache[action.payload.id] = action.payload;
            return {
                ...state,
                cache: newCache
            }

        case recipesActions.UPDATE_CACHE:
            const updatedCache = {...state.cache};
            updatedCache[action.payload.id] = action.payload
            return {
                ...state,
                cache: updatedCache
            };
        default:
            return state;
    }
}