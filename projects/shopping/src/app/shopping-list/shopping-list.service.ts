import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as shlist from './store/shopping-list.actions';
import { Ingredient, IngredientRaw } from "../shared/ingredient.interface";
import { map, Observable, switchMap, take, tap, throwError, catchError, Subscription } from "rxjs";
import { AppState } from "../store/app.reducer";
import { setSubmitting, setToast } from "../store/general.store";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    userId: string | null;
    userSub: Subscription;

    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.userSub = this.store.select(store => store.auth.user).subscribe(
            user => this.userId = user ? user.id : null
        );
    }

    makeUrl(path?: string): string {
        if (!this.userId) throw new Error('Authentication error');
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/list/${this.userId}${path ? '/' + path : ''}.json`;
    }

    fetchIngredients() {
        const url = this.makeUrl();
        return this.http.get<{[id: string]: IngredientRaw}>(url).pipe(
            map(ingDict => (ingDict ? Object.entries(ingDict).reduce((acc, [id, ingRaw]) => {
                        acc.push(new Ingredient({...ingRaw, id: id}));
                        return acc;
                    }, [] as Ingredient[]) : [])
            ),
            catchError(error => this.handleError(error))
        )
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
                            if (dispatch)
                                this.store.dispatch(new shlist.AddIngredient(ing));
                        }),
                        catchError(err => this.handleError(err))
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
                    if (dispatch) {
                        this.store.dispatch(new shlist.UpdateIngredient(updatedIng));
                    }
                    if (duplicateId) 
                        this.deleteIngredient(duplicateId);
                }),
                catchError(this.handleError)
            )}))
    }

    addIngredients(ingRaws: IngredientRaw[]) {
        this.store.dispatch(setSubmitting({status: true}));
        return this.store.select('shoppingList').pipe(
            take(1),
            map(state => state.ingredients),
            map(ings => {
                const updatedIngs = ings.map(it => new IngredientRaw(it));
                ingRaws.forEach((ing, i) => {
                    const exI = updatedIngs.findIndex(it => it.name === ing.name && it.unit === ing.unit);
                    if (exI > -1) {
                        if (ing.amount) {
                            const ex = updatedIngs[exI];
                            updatedIngs[exI] = new IngredientRaw({...ex, amount: ex.amount + ing.amount});
                        }
                    }
                    else updatedIngs.push(new IngredientRaw(ing))
                });
                return updatedIngs;
            }),
            switchMap(raws => this.http.put<IngredientRaw[]>(this.makeUrl(), raws)),
            map(raws => raws.map((ing, i) => new Ingredient({...ing, id: i.toString()}))),
            tap(ings => this.store.dispatch(new shlist.SetUpdatedIngredients(ings))),
            catchError(this.handleError)
        )
        
    }

    deleteIngredient(id: string) {
        this.http.delete<null>(this.makeUrl(id)).subscribe(
            _ => this.store.dispatch(new shlist.DeleteIngredient(id))
        );
    }

    handleError(err: HttpErrorResponse) {
        console.log('Error handling recipes', err);
        let errorMsg = 'An error has occurred.';
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
        this.store.dispatch(setToast({toast: {message: errorMsg, isError: true}}))
        return throwError(() => new Error(errorMsg));
    }
}