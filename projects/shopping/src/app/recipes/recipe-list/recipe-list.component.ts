import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import { Recipe, RecipeDict } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    @Input('filterString') filterString: string;
    recipes: RecipeDict;
    recipesUpdateSubsc: Subscription;

    constructor(private recipeService: RecipesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.recipes = data['recipes'];
            }
        );
        this.recipesUpdateSubsc = this.recipeService.recipesUpdated.subscribe(
            recipes => {
                this.recipes = recipes
            }
        );
    }

    ngOnDestroy(): void {
        this.recipesUpdateSubsc.unsubscribe();
    }
}