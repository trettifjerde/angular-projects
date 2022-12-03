import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Recipe, RecipeRaw } from "../recipes/recipe.model";
import { IngredientRaw } from "../shared/ingredient.interface";
import { ShoppingListService } from "./shopping-list.service";
import * as recipeActions from "../recipes/store/recipes.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

@Injectable({providedIn: 'root'})
export class RecipesService {
    constructor(private http: HttpClient, private store: Store<AppState>, private listService: ShoppingListService) {}

    makeUrl(path='') : string {
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes${path}.json`;
    }
    makePaginatedGetUrl(start: boolean) : string {
        const paramStr = start ? '&startAt="m"' : '&endAt="m';
        const encoded = encodeURI(this.makeUrl() + '?orderBy="name"' + paramStr);
        console.log(encoded);
        return encoded;
    }

    fetchRecipes(startId=''): Observable<Recipe[]> {
        return this.http.get<{[id: string]: RecipeRaw}>(this.makeUrl(), {
            params: new HttpParams().set('orderBy', '"$key"').set('startAt', (startId ? `"${startId}0"` : '')).set('limitToFirst', 3)
        }).pipe(
            map(recipesDict => recipesDict ? Object.entries(recipesDict).reduce(
                (acc, [id, recipe]) => {
                    acc.push(new Recipe({...recipe, id: id}));
                    return acc;
                }, [] as Recipe[]) : []
            ),
            catchError(err => {
                console.log('Error while fetching recipes', err);
                return throwError(() => err);
            })
        )
    }

    addRecipe(recipe: RecipeRaw): Observable<Recipe> {
        return this.http.post<{name: string}>(this.makeUrl(), recipe).pipe(
            map(res => new Recipe({...recipe, id: res.name})),
            catchError(err => {
                console.log('error adding new recipe:', err);
                return throwError(() => err);
            })
        )
    }

    updateRecipe(id: string, recipe: RecipeRaw) {
        return this.http.patch<RecipeRaw>(this.makeUrl('/' + id), recipe).pipe(
            map(res => new Recipe({...recipe, id: id})),
            catchError(err => {
                console.log('error updating recipe:', err);
                return throwError(() => err);
            })
        )
    }

    deleteRecipe(id: string){
        this.http.delete<null>(this.makeUrl('/' + id)).subscribe({
            next: () => this.store.dispatch(new recipeActions.DeleteRecipe(id)),
            error: (err) => this.store.dispatch(new recipeActions.RecipesHttpFail(err))
        })
    }

    getRecipe(id: string): Observable<Recipe> {
        return this.http.get<RecipeRaw>(this.makeUrl('/' + id)).pipe(
            map(res => res ? new Recipe({...res, id: id}) : null)
        )
    }
}