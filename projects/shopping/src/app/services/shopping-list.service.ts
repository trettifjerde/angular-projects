import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as shlist from '../shopping-list/store/shopping-list.actions';
import { AppState } from "../shopping-list/store/shopping-list.reducer";
import { Ingredient, IngredientRaw } from "../shared/ingredient.interface";
import { catchError, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    constructor(private http: HttpClient, private store: Store<AppState>) {}

    makeUrl(path: string=''): string {
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/list${path}.json`;
    }

    fetchIngredients() {
        this.http.get<{[id: string]: IngredientRaw}>(this.makeUrl()).subscribe(
            ingDict => {
                const ings = Object.entries(ingDict).reduce((acc, [id, ing]) => {
                    acc.push({...ing, id: id});
                    return acc;
                }, [] as Ingredient[]);
                this.store.dispatch(new shlist.FetchIngredients(ings));
            }
        )
    }

    clearIngredients() {
        this.store.dispatch(new shlist.ClearIngredients());
    }

    addIngredient(ingRaw: IngredientRaw) : Observable<null> {
        return this.http.post<{name: string}>(this.makeUrl(), ingRaw).pipe(
            tap(obj => this.store.dispatch(new shlist.AddIngredient({...ingRaw, id: obj.name}))),
            map(() => (null))
        )
    }

    addIngredients(ings: IngredientRaw[]) {}

    updateIngredient(id: string, ing: IngredientRaw) : Observable<null> {
        return this.http.patch<{[id: string]: IngredientRaw}>(this.makeUrl(), {[id]: ing}).pipe(
            tap(() => this.store.dispatch(new shlist.UpdateIngredient({...ing, id: id}))),
            map(() => (null))
        )
    }

    deleteIngredient(id: string) {
        this.http.delete<null>(this.makeUrl('/' + id)).subscribe(
            () => this.store.dispatch(new shlist.DeleteIngredient(id))
        )
    }

}