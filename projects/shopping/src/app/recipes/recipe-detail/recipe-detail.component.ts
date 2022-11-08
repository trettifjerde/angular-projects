import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(
            (params) => {
                this.id = +params['id']
                this.recipe = this.recipeService.getRecipe(this.id);
            }
        )
    }

    toShoppingList() {
        this.recipeService.toShoppingList(this.recipe.ingredients);
        return false;
    }

    deleteRecipe() {
        if (confirm('Delete recipe?')) {
            this.recipeService.deleteRecipe(this.id);
            this.router.navigate(['/recipes']);
        }
    }
}