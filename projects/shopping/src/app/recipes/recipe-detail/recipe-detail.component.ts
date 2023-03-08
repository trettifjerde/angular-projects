import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, Subscription } from "rxjs";
import { User } from "../../auth/user.model";
import { RecipesService } from "../recipes.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    recipe: Recipe;
    manageBtnDisabled = false;
    authSubscription: Subscription;
    recipeDataSub: Subscription;
    user: User = null;
    modalVisible = false;

    constructor(
        private store: Store<AppState>, 
        private recipeService: RecipesService, 
        private listService: ShoppingListService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.authSubscription = this.store.select(store => store.auth.user)
            .subscribe(user => this.user = user);

        this.recipeDataSub = this.route.data.subscribe(
            data => {
                this.recipe = data['recipe']
            }
        )
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
        this.recipeDataSub.unsubscribe();
    }

    toShoppingList() {
        this.listService.addIngredients(this.recipe.ingredients).subscribe();
    }

    closeModal() { this.modalVisible = false; }

    askDeleteConfirm() { this.modalVisible = true; }

    deleteRecipe() {
        this.recipeService.deleteRecipe(this.recipe.id);
    }
}