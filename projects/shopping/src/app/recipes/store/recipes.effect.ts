import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import * as routerActions from "@ngrx/router-store";

import * as recipeActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
    constructor(private actions$: Actions, private recipeService: RecipesService, private router: Router) {}

    recipesInit = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.RECIPES_INIT),
        switchMap(() => this.recipeService.fetchRecipes().pipe(
                map(recipes => new recipeActions.RecipesInitSuccess(recipes)),
                catchError(err => of(new recipeActions.RecipesInitFail(err)))
        ))
    ));

    fetchRecipes = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.RECIPES_FETCH_STARTED),
        switchMap((action: recipeActions.StartFetchRecipes) => this.recipeService.fetchRecipes(action.payload).pipe(
            map(recipes => new recipeActions.RecipesFetchSuccess(recipes)),
            catchError(err => of(new recipeActions.RecipesHttpFail(err)))
        )),
    ))

    startAddRecipe = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.START_ADD_RECIPE),
        switchMap((action: recipeActions.StartAddRecipe) => this.recipeService.addRecipe(action.payload).pipe(
            map(recipe => new recipeActions.AddRecipe(recipe)),
            catchError(err => of(new recipeActions.RecipesHttpFail(err)))
        ))
    ))

    startUpdateRecipe = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.START_UPDATE_RECIPE),
        switchMap((action: recipeActions.StartUpdateRecipe) => this.recipeService.updateRecipe(...action.payload).pipe(
            map(recipe => new recipeActions.UpdateRecipe(recipe)),
            catchError(err => of(new recipeActions.RecipesHttpFail(err)))
        ))
    ))

    recipeRedirect = createEffect(() => this.actions$.pipe(
        ofType(recipeActions.ADD_RECIPE, recipeActions.UPDATE_RECIPE, recipeActions.DELETE_RECIPE),
        tap((action: recipeActions.AddRecipe | recipeActions.UpdateRecipe | recipeActions.DeleteRecipe) => {
            switch (action.type) {
                case recipeActions.ADD_RECIPE:
                case recipeActions.UPDATE_RECIPE:
                    this.router.navigate(['/recipes', action.payload.id]);
                    break;
                default:
                    this.router.navigate(['/recipes']);
            }
        })
    ), {dispatch: false})

    startNavigation = createEffect(() => this.actions$.pipe(
        ofType(routerActions.ROUTER_REQUEST),
        map(_ => new recipeActions.StartNavigation())
    ))

    completeNavigation = createEffect(() => this.actions$.pipe(
        ofType(routerActions.ROUTER_CANCEL, routerActions.ROUTER_NAVIGATED, routerActions.ROUTER_ERROR),
        map(_ => new recipeActions.CompleteNavigation())
    ))



}