import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "../../auth/user.model";
import { RecipesService } from "../recipes.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";
import { setSubmitting } from "../../store/general.store";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy, AfterViewInit {
    recipe: Recipe;
    manageBtnDisabled = false;
    authSubscription: Subscription;
    recipeDataSub: Subscription;
    user: User = null;

    constructor(
        private store: Store<AppState>, 
        private recipeService: RecipesService, 
        private listService: ShoppingListService,
        private route: ActivatedRoute
    ) {}

    @ViewChild('cont', {static: true}) cont: ElementRef;

    ngOnInit(): void {
        this.authSubscription = this.store.select(store => store.auth.user)
            .subscribe(user => this.user = user);

        this.recipeDataSub = this.route.data.subscribe(
            data => this.recipe = data['recipe']
        )
    }

    ngAfterViewInit(): void {
        this.cont.nativeElement.scrollIntoView(true);
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
        this.recipeDataSub.unsubscribe();
    }

    toShoppingList() {
        this.listService.addIngredients(this.recipe.ingredients).subscribe();
    }

    deleteRecipe() {
        if (confirm('Delete recipe?')) {
            this.recipeService.deleteRecipe(this.recipe.id);
        }
    }
}