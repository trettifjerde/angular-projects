import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "../../auth/user.model";
import { RecipesService } from "../../services/recipes.service";
import { AppState } from "../../store/app.reducer";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: string;
    manageBtnDisabled = false;
    authSubscription: Subscription;
    user: User = null;

    constructor(private store: Store<AppState>, private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) {}

    @ViewChild('cont', {static: true}) cont: ElementRef;

    ngOnInit(): void {
        this.authSubscription = this.store.select('auth').pipe(map(state => state.user))
            .subscribe(user => this.user = user);

        this.route.params.subscribe(
            params => this.id = params['id']
        );
        this.route.data.subscribe(
            data => {
                this.recipe = data['recipe'];
                this.cont.nativeElement.scrollIntoView(true);
            }
        )
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    toShoppingList() {
        this.recipeService.toShoppingList(this.recipe.ingredients);
        return false;
    }

    deleteRecipe() {
        if (confirm('Delete recipe?')) {
            this.manageBtnDisabled = true;
            this.recipeService.deleteRecipe(this.id).subscribe(
                () => this.router.navigate(['../'], {relativeTo: this.route})
            );
            
        }
    }
}