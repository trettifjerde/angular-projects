import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent {
    recipe: Recipe;
    id: number;
    editMode = false;


    constructor(private recipeService: RecipesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if ('id' in params) {
                this.id = +params['id'];
                this.recipe = this.recipeService.getRecipe(this.id);
                this.editMode = true;
            }
            else {
                this.editMode = false;
                this.id = null;
                this.recipe = new Recipe();
            }
        })
    }
}