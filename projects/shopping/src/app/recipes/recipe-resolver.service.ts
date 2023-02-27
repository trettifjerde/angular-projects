import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, Observable, switchMap, take, of } from "rxjs";
import { RecipesService } from "./recipes.service";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import * as recipeActions from "../recipes/store/recipes.actions"; 

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipesService, private router: Router, private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        const id = route.params['id'];
        return id ? ( this.store.select(store => store.recipes.cache).pipe(
                take(1),
                switchMap(cache => ((id in cache) ? of(cache[id]) : this.recipeService.getRecipe(id).pipe(
                    map(recipe => {
                        if (recipe) {
                            this.store.dispatch(new recipeActions.CacheRecipe(recipe));
                            return recipe;
                        }
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
                )))
            )
        ) : null;
    }
    
}


