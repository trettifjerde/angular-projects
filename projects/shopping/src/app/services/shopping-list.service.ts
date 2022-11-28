import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as shlist from '../shopping-list/store/shopping-list.actions';
import { Ingredient, IngredientRaw } from "../shared/ingredient.interface";
import { map, Observable, tap } from "rxjs";
import { AppState } from "../store/app.reducer";

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

    addIngredient(ing: Ingredient) : Observable<null> {
        const {id, ...ingRaw} = ing;
        return this.http.post<{name: string}>(this.makeUrl(), ingRaw).pipe(
            tap(obj => this.store.dispatch(new shlist.AddIngredient({...ingRaw, id: obj.name}))),
            map(() => (null))
        )
    }

    addIngredients(ings: IngredientRaw[]) {}

    updateIngredient(ing: Ingredient) : Observable<null> {
        const {id, ...ingRaw} = ing;
        return this.http.patch<{[id: string]: IngredientRaw}>(this.makeUrl(), {[id]: ingRaw}).pipe(
            tap(() => this.store.dispatch(new shlist.UpdateIngredient({...ing}))),
            map(() => (null))
        )
    }

    deleteIngredient(id: string) {
        this.http.delete<null>(this.makeUrl('/' + id)).subscribe(
            () => this.store.dispatch(new shlist.DeleteIngredient(id))
        )
    }

}