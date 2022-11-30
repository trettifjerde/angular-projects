import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, exhaustMap, map, Observable, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private store: Store<AppState>, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        const id = route.params['id'];
        if (id)
            return this.store.select('recipes').pipe(
                take(1),
                map(state => {
                    const recipe = state.recipes.find(r => r.id === id);
                    if (recipe)
                        return recipe;
                    else
                        throw null;
                }),
                catchError(() => {
                    this.router.navigate(['/recipes']);
                    return EMPTY;
                })
            );
        else
            return null;
    }
    
}


