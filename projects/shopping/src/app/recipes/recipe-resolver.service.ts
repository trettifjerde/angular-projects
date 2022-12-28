import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, Observable } from "rxjs";
import { RecipesService } from "../services/recipes.service";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import * as recipeActions from "../recipes/store/recipes.actions"; 

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipesService, private router: Router, private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        const id = route.params['id'];
        if (id) {
            return this.recipeService.getRecipe(id).pipe(
                map(recipe => {
                    if (recipe)
                        return recipe;
                    else {
                        console.log('recipe not found', id);
                        this.router.navigate(['/recipes/404'], {skipLocationChange: true});
                        return null;
                    }
                }),
                catchError(errorMsg => {
                    this.store.dispatch(new recipeActions.RecipesHttpFail(errorMsg));
                    this.router.navigate(['/recipes']);
                    return EMPTY;
                })
            )
            /*return this.store.select('recipes').pipe(
                take(1),
                map(state => {
                    const recipe = state.recipes.find(r => r.id === id);
                    if (recipe)
                        return recipe;
                    else
                        throw null;
                }),
                catchError(err => {
                    console.log(err);
                    this.router.navigate(['/recipes']);
                    return EMPTY;
                })
            );*/
        }
        else
            return null;
    }
    
}


