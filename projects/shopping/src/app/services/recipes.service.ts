import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, Subject, tap } from "rxjs";
import { Recipe, RecipeDict } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.interface"; 
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: RecipeDict;
    private isFetched = false;
    recipesUpdated = new Subject<RecipeDict>();

    constructor(private http: HttpClient, private listService: ShoppingListService) {}

    fetchRecipes() : Observable<RecipeDict> | RecipeDict {
        if (!this.isFetched) {
            return this.http.get<RecipeDict>('recipes').pipe(
                map(recs => {
                    if (recs === null) 
                        return {} as RecipeDict;
                    else 
                        return recs;
                }),
                tap(
                    recs => {
                        this.isFetched = true;
                        this.recipes = Object.entries(recs).reduce(
                            (acc, [id, recipe]) => {
                                acc[id] = new Recipe(recipe);
                                return acc;
                            }, {}
                        )
                    }
                ),
            )
        }
        else {
            return this.recipes;
        }
    }

    announceRecipesUpdate() {
        this.recipesUpdated.next(this.getRecipes());
    }

    getRecipes() {
        return {...this.recipes};
    }

    getRecipe(id: string): Recipe {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) : Observable<string> {
        return this.http.post<{name: string}>('recipes', recipe).pipe(
            map(idObj => {
                const id = idObj.name;
                this.recipes[id] = new Recipe(recipe);
                this.announceRecipesUpdate();
                return id;
            })
        )
    }

    updateRecipe(id: string, recipe: Recipe) {
        return this.http.put<Recipe>('recipes/' + id, recipe).pipe(
            tap(res => {
                this.recipes[id] = res;
                this.announceRecipesUpdate();
            })
        );
    }

    deleteRecipe(id: string) : Observable<null> {
        return this.http.delete<null>('recipes/' + id).pipe(
            tap(() => {
                delete this.recipes[id];
                this.announceRecipesUpdate();
            })
        );
    }

    toShoppingList(ingredients: Ingredient[]) {
        this.listService.addIngredients(ingredients);
    }
}