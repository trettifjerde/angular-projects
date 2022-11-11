import { Pipe, PipeTransform } from "@angular/core";
import { Recipe, RecipeDict } from "../recipes/recipe.model";

@Pipe({name: 'recipeFilter'})
export class FilterPipe implements PipeTransform {
    transform(items: RecipeDict, searchString: string) {
        if (Object.keys(items).length === 0)
            return [];

        const recipeString = searchString.toLowerCase();
        const res = Object
            .entries(items)
            .filter(([key, recipe]) => recipe.name.toLocaleLowerCase().includes(recipeString))
            .map(([key, value]) => { return {id: key, recipe: value}})
        console.log(res);
        return res;
    }
}