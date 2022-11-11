import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, Subject, tap } from "rxjs";
import { Ingredient, IngredientRaw } from "../shared/ingredient.interface";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [];
    private fetched = false;
    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredientBeingEditted = new Subject<[number, Ingredient]>();

    constructor(private http: HttpClient) {}

    private _addIngredient(ing: IngredientRaw): Observable<{name: string}> {
        return this.http.post<{name: string}>('list', ing).pipe(
            tap(nameObj => this.ingredients.push({id: nameObj.name, ...ing}))
        );
    }

    private _updateIngredient(id: string, ing: IngredientRaw): Observable<IngredientRaw> {
        return this.http.put<IngredientRaw>('list/' + id, ing);
    }

    addIngredient(ingRaw: IngredientRaw, announce=true) {
        const i = this.ingredients.findIndex(ing => ing.name === ingRaw.name);
        if (i >= 0){
            const ing = {...ingRaw};
            ing.amount += this.ingredients[i].amount;
            this.updateIngredient(i, ing, announce);
        }
        else {
            this._addIngredient(ingRaw).subscribe(
                () => {
                    if (announce) 
                        this.announceIngredientsUpdate();
                }
            )
        }
    }

    updateIngredient(i: number, ingRaw: IngredientRaw, announce=true) {
        const id = this.ingredients[i].id;
        this._updateIngredient(id, ingRaw).subscribe(
            resIng => {
                this.ingredients[i] = {...resIng, id: id};
                if (announce) this.announceIngredientsUpdate();
            }
        )
    }

    addIngredients(ingredients: IngredientRaw[]) {
        ingredients.forEach(ing => this.addIngredient(ing, false));
        this.announceIngredientsUpdate();
    }

    fetchIngredients(): Observable<Ingredient[]> {
        return this.http.get<{[id: string]: IngredientRaw}>('list').pipe(
            map(ingreds => {
                if (ingreds === null) 
                    return [];
                else 
                    return Object.entries(ingreds).map(
                        ([id, ingRaw]) => { 
                            return {
                                id: id, 
                                name: ingRaw.name, 
                                amount: ingRaw.amount
                            }
                        }); 
            }),
            catchError(error => {
                console.log(error);
                return [];
            })
        );
    }

    getIngredient(i: number): Ingredient {
        return {...this.ingredients[i]};
    }

    getIngredients() : Ingredient[] {
        return this.ingredients.slice();
    }

    pokeIngredients() {
        if (! this.fetched) {
            this.fetchIngredients().subscribe(
                ingreds => {
                    this.fetched = true;
                    this.ingredients = ingreds;
                    this.announceIngredientsUpdate();
                }
            )
        }
        else this.announceIngredientsUpdate();
    }

    announceIngredientsUpdate() {
        this.ingredientsUpdated.next(this.getIngredients());
    }

    deleteIngredient(i: number): Observable<null> {
        const id = this.ingredients[i].id;
        return this.http.delete<null>('list/' + id).pipe(
            tap(() => {
                this.ingredients.splice(i, 1);
                this.announceIngredientsUpdate();
            })
        )
    }

    startEditting(i: number) {
        this.ingredientBeingEditted.next([i, this.getIngredient(i)]);
    }
}