import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, Subject, tap } from "rxjs";
import { Recipe, RecipeRaw } from "../recipes/recipe.model";
import { IngredientRaw } from "../shared/ingredient.interface"; 
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[];
    private isFetched = false;
    recipesUpdated = new Subject<Recipe[]>();

    constructor(private http: HttpClient, private listService: ShoppingListService) {}

    makeUrl(path: string) : string {
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/${path}.json`;
    }

    fetchRecipes() : Observable<Recipe[]> {
        // Updates the global Recipe dict and returns a new portion of recipes
        return this.http.get<{[id: string]: RecipeRaw}>(this.makeUrl('recipes')).pipe(
            map(recipesDict => recipesDict ? Object.entries(recipesDict).reduce(
                        (acc, [id, recipe]) => {
                            acc.push(new Recipe({...recipe, id: id}));
                            return acc;
                        }, []) : []
            ),
            map(recipes => {
                this.isFetched = true;
                return this.updateRecipes(recipes);
            })
        )
    }

    updateRecipes(newRecipes?: Recipe[], ...excludeRecipesIds: string[]) : Recipe[] {
        let updatedRecipes = this.recipes ? [...this.recipes] : [];

        if (excludeRecipesIds) 
            updatedRecipes = updatedRecipes.filter(r => ! excludeRecipesIds.includes(r.id))
        if (newRecipes) 
            updatedRecipes.push(...newRecipes);

        this.recipes = updatedRecipes;
        this.recipesUpdated.next(updatedRecipes);

        return updatedRecipes;
    }

    getRecipes(): Observable<Recipe[]> {
        return this.isFetched ? of([...this.recipes]) : this.fetchRecipes();
    }

    getRecipe(id: string) : Observable<Recipe|null> {
        return this.http.get<RecipeRaw>(this.makeUrl('recipes/' + id)).pipe(
            map(r => {
                if (r === null) throw new Error('Recipe not found');
                else return new Recipe({...r, id: id})
            })
        );
    }

    loadMoreRecipes() {
        this.fetchRecipes().subscribe();
    }

    addRecipe(recipe: RecipeRaw) : Observable<string> {
        return this.http.post<{name: string}>(this.makeUrl('recipes'), recipe).pipe(
            map(idObj => {
                const id = idObj.name;
                this.updateRecipes([new Recipe({...recipe, id: id})]);
                return id;
            })
        )
    }

    updateRecipe(id: string, recipeRaw: any): Observable<Recipe> {
        return this.http.put<RecipeRaw>(this.makeUrl('recipes/' + id), recipeRaw).pipe(
            map(() => new Recipe({...recipeRaw, id: id})),
            tap(recipe => this.updateRecipes([recipe], recipe.id))
        );
    }

    deleteRecipe(id: string) : Observable<null> {
        return this.http.delete<null>(this.makeUrl('recipes/' + id)).pipe(
            tap(() => this.updateRecipes([], id))
        );
    }

    toShoppingList(ingredients: IngredientRaw[]) {
        this.listService.addIngredients(ingredients);
    }
}