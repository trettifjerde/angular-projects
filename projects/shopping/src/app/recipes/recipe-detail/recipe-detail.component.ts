import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
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

    constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(
            params => this.id = params['id']
        );
        this.route.data.subscribe(
            data => this.recipe = data['recipe']
        )
    }

    toShoppingList() {
        this.recipeService.toShoppingList(this.recipe.ingredients);
        return false;
    }

    deleteRecipe() {
        if (confirm('Delete recipe?')) {
            this.manageBtnDisabled = true;
            this.recipeService.deleteRecipe(this.id).subscribe(
                () => this.router.navigate(['/recipes'])
            );
            
        }
    }
}