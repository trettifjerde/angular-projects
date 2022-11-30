import { Action } from "@ngrx/store";
import { Recipe, RecipeRaw } from "../recipe.model";

export const RECIPES_INIT = 'RECIPES_INIT';
export const RECIPES_INIT_SUCCESS = 'RECIPES_INIT_SUCCESS';
export const RECIPES_INIT_FAIL = 'RECIPES_INIT_FAIL';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const RECIPES_FETCH_SUCCESS = 'RECIPES_FETCH_SUCCESS';
export const RECIPES_HTTP_FAIL = 'RECIPES_HTTP_FAIL';
export const START_ADD_RECIPE = 'START_ADD_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const START_UPDATE_RECIPE = 'START_UPDATE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export type RecipesAction = RecipesInit | RecipesInitSuccess | RecipesInitFail | RecipesFetchSuccess | FetchRecipes | RecipesHttpFail | StartAddRecipe | 
    AddRecipe | StartUpdateRecipe | UpdateRecipe | DeleteRecipe;

export class RecipesInit implements Action {
    readonly type = RECIPES_INIT;
    constructor() {}
}

export class RecipesInitSuccess implements Action {
    readonly type = RECIPES_INIT_SUCCESS;
    constructor(public payload: Recipe[]) {}
}

export class RecipesInitFail implements Action {
    readonly type = RECIPES_INIT_FAIL;
    constructor(public payload: Error) {}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
    constructor() {}
}

export class RecipesFetchSuccess implements Action {
    readonly type = RECIPES_FETCH_SUCCESS;
    constructor(public payload: Recipe[]) {}
}

export class RecipesHttpFail implements Action {
    readonly type = RECIPES_HTTP_FAIL;
    constructor(public payload: Error) {}
}

export class StartAddRecipe implements Action {
    readonly type = START_ADD_RECIPE;
    constructor(public payload: RecipeRaw) {}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class StartUpdateRecipe implements Action {
    readonly type = START_UPDATE_RECIPE;
    constructor(public payload: [string, RecipeRaw]) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: string) {}
}
