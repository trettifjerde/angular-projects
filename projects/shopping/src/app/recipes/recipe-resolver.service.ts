import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, EMPTY, exhaustMap, map, Observable } from "rxjs";
import { RecipesService } from "../services/recipes.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeListResolver implements Resolve<Recipe[]> {
    constructor(private recipeService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.recipeService.getRecipes();
    }
}

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        const id = route.params['id'];
        if (id)
            return this.recipeService.getRecipe(id).pipe(
                catchError(() => {
                    this.router.navigate(['']);
                    return EMPTY;
                })
            );
        else
            return null;
    }
    
}


