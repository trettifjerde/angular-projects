import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "../../auth/user.model";
import { RecipesService } from "../../services/recipes.service";
import { ShoppingListService } from "../../services/shopping-list.service";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy, AfterViewInit {
    recipe: Recipe;
    manageBtnDisabled = false;
    authSubscription: Subscription;
    user: User = null;

    constructor(
        private store: Store<AppState>, 
        private recipeService: RecipesService, 
        private listService: ShoppingListService,
        private route: ActivatedRoute
    ) {}

    @ViewChild('cont', {static: true}) cont: ElementRef;

    ngOnInit(): void {
        this.authSubscription = this.store.select('auth')
            .pipe(map(state => state.user)
        )
        .subscribe(user => this.user = user);

        this.route.data.subscribe(
            data => this.recipe = data['recipe']
        )
    }

    ngAfterViewInit(): void {
        this.cont.nativeElement.scrollIntoView(true);
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    toShoppingList() {
        this.manageBtnDisabled = true;
        this.listService.addIngredients(this.recipe.ingredients).subscribe({
            next: _ => this.manageBtnDisabled = false,
            error: _ => this.manageBtnDisabled = false
        });
    }

    deleteRecipe() {
        if (confirm('Delete recipe?')) {
            this.manageBtnDisabled = true;
            this.recipeService.deleteRecipe(this.recipe.id);
        }
    }
}