import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RecipesService } from "../../../services/recipes.service";
import { Recipe } from "../../recipe.model";

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
    @Input() id: number;
    recipe: Recipe

    constructor(private recipeService: RecipesService) { }

    ngOnInit() {
        this.recipe = this.recipeService.getRecipe(this.id);
    }

}