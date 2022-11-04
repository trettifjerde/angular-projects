import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styles: [`
    .r-c { overflow: auto; max-height: 75vh;}
    `]
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [];

    constructor(private recipeService: RecipesService) {}

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
    }

    addNewRecipe() {
        const rec = new Recipe(
            'Spaghetti', 
            'Tasty and easy to make!', 
            'https://veganwithgusto.com/wp-content/uploads/2021/05/speedy-spaghetti-arrabbiata-featured-e1649949762421.jpg',
            []
        );
        this.recipeService.addRecipe(rec);
    }
}