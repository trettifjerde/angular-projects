import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipesService } from "../services/recipes.service";
import { Recipe, RecipeDict } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeListResolver implements Resolve<RecipeDict> {
    constructor(private recipeService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeDict | Observable<RecipeDict> | Promise<RecipeDict> {
        return this.recipeService.fetchRecipes();
    }
}

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<[Recipe, string]> {
    constructor(private recipeService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): [Recipe, string] | Observable<[Recipe, string]> | Promise<[Recipe, string]> {
        const id = route.params['id'];
        return [this.recipeService.getRecipe(route.params['id']), id];
    }
}


