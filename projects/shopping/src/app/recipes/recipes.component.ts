import { Component } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RecipesService } from "../services/recipes.service";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
    constructor(private recipeService: RecipesService) {}
    filterString = '';

    clearFilter() {
        this.filterString = '';
    }

}