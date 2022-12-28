import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
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
            catchError(err => this.handleError(err))
        )
    }

    addRecipe(recipe: RecipeRaw): Observable<Recipe> {
        return this.http.post<{name: string}>(this.makeUrl(), recipe).pipe(
            map(res => new Recipe({...recipe, id: res.name})),
            catchError(this.handleError)
        )
    }

    updateRecipe(id: string, recipe: RecipeRaw) {
        return this.http.patch<RecipeRaw>(this.makeUrl('/' + id), recipe).pipe(
            map(res => new Recipe({...recipe, id: id})),
            catchError(this.handleError)
        )
    }

    deleteRecipe(id: string){
        this.http.delete<null>(this.makeUrl('/' + id))
        .pipe(
            catchError(this.handleError)
        )
        .subscribe({
            next: () => this.store.dispatch(new recipeActions.DeleteRecipe(id)),
            error: (err) => this.store.dispatch(new recipeActions.RecipesHttpFail(err))
        })
    }

    getRecipe(id: string): Observable<Recipe> {
        return this.http.get<RecipeRaw>(this.makeUrl('/' + id)).pipe(
            map(res => res ? new Recipe({...res, id: id}) : null),
            catchError(this.handleError)
        )
    }

    handleError(err: HttpErrorResponse) {
        console.log('Error handling recipes', err);
        let errorMsg = 'An error has occurred. Reload the page';
        switch(err.status) {
            case 504:
                errorMsg = 'Network connection lost';
                break;
            case 404:
                errorMsg = 'Resource not found';
                break;
            case 400:
                errorMsg = 'Bad request';
                break;
            case 500:
                errorMsg = 'Server error';
                break;
        }
        return throwError(() => errorMsg);
    }
}