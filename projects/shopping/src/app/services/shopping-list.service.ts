import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as shlist from '../shopping-list/store/shopping-list.actions';
import { Ingredient, IngredientRaw } from "../shared/ingredient.interface";
import { map, Observable, of, switchMap, take, tap } from "rxjs";
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
        console.log('fetching ingreds');
        this.http.get<{[id: string]: IngredientRaw}>(this.makeUrl()).subscribe({
            next: ingDict => {
                if (ingDict) {
                    const ings = Object.entries(ingDict).reduce((acc, [id, ingRaw]) => {
                        acc.push(new Ingredient({...ingRaw, id: id}));
                        return acc;
                    }, [] as Ingredient[]);
                    this.store.dispatch(new shlist.FetchIngredients(ings));
                }
                else this.store.dispatch(new shlist.ClearIngredients());
            },
            error: err => {
                console.log(err);
                this.store.dispatch(new shlist.ClearIngredients());
            }
        })
    }

    clearIngredients() {
        this.store.dispatch(new shlist.ClearIngredients());
    }

    addIngredient(ingRaw: IngredientRaw, dispatch=true) : Observable<Ingredient> {
        return this.store.select('shoppingList').pipe(
            take(1),
            map(shlistData => shlistData.ingredients),
            switchMap(ingredList => {
                const duplicate = ingredList.find(i => (i.name === ingRaw.name && i.unit === ingRaw.unit));
                if (duplicate) {
                    const updatedIng = new Ingredient({...ingRaw, amount: ingRaw.amount + duplicate.amount, id: duplicate.id});
                    return this.updateIngredient(updatedIng, dispatch);
                }
                else
                    return this.http.post<{name: string}>(this.makeUrl(), ingRaw).pipe(
                        map(res => new Ingredient({...ingRaw, id: res.name})),
                        tap(ing => { 
                            if (dispatch) this.store.dispatch(new shlist.AddIngredient(ing)) 
                        }),
                    )
            })
        )
    }

    updateIngredient(ing: Ingredient, dispatch=true) : Observable<Ingredient> {
        return this.store.select('shoppingList').pipe(
            take(1),
            map(state => state.ingredients),
            map(ings => {
                const duplicate = ings.find(i => (i.name === ing.name && i.id !== ing.id && i.unit === ing.unit));
                if (duplicate) {
                    const updatedIngRaw = new IngredientRaw({...ing, amount: ing.amount + duplicate.amount});
                    return [duplicate.id, updatedIngRaw];
                }
                else {
                    return [null, new IngredientRaw({...ing})];
                }
            }),
            switchMap(([duplicateId, ingRaw]: [string, IngredientRaw]) => {
                return this.http.patch<{[id: string]: IngredientRaw}>(this.makeUrl(), {[ing.id]: ingRaw}).pipe(
                map(_ => new Ingredient({...ingRaw, id: ing.id})),
                tap(updatedIng => {
                    if (dispatch) 
                        this.store.dispatch(new shlist.UpdateIngredient(updatedIng));
                    if (duplicateId) 
                        this.deleteIngredient(duplicateId);
                })
            )}))
    }

    addIngredients(ingRaws: IngredientRaw[]) {
        const ings: Ingredient[] = [];
        let obsChain = this.addIngredient(ingRaws[0], false);
        for (let i = 1; i < ingRaws.length; i++) {
            obsChain = obsChain.pipe(
                tap(res => ings.push(res)),
                switchMap(res => this.addIngredient(ingRaws[i], false))
            )
        }
        obsChain.subscribe({
            next: res => {
                ings.push(res);
                this.store.dispatch(new shlist.AddIngredients(ings));
            }
        })
    }

    deleteIngredient(id: string) {
        this.http.delete<null>(this.makeUrl('/' + id)).subscribe(
            _ => this.store.dispatch(new shlist.DeleteIngredient(id))
        );
    }

}