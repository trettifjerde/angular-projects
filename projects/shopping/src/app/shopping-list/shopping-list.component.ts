import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingListService } from "../services/shopping-list.service";
import { Ingredient } from "../shared/ingredient.interface"; 

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[] = [];
    ingredientsSubscription: Subscription;
    isFetched = false;
    @ViewChild('ingredientsCont') ingredientsCont: ElementRef;

    constructor(private listService: ShoppingListService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.ingredientsSubscription = this.listService.ingredientsUpdated.subscribe(
            (ings) => {
                this.ingredients = ings;
                this.isFetched = true;
            }
        );
        this.listService.pokeIngredients();
    }

    ngOnDestroy(): void {
        this.ingredientsSubscription.unsubscribe();
    }

    deleteItem(i: number) {
        if (confirm('Delete item?'))
        {
            const el = this.ingredientsCont.nativeElement.querySelectorAll('.ingredient')[i];
            this.renderer.removeClass(el, 'interactive');
            this.listService.deleteIngredient(i).subscribe();
        }
    }

    editItem(i: number) {
        this.listService.startEditting(i);
    }
}