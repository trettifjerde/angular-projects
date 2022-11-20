import { Pipe, PipeTransform } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";

@Pipe({name: 'recipeFilter'})
export class FilterPipe implements PipeTransform {
    transform(items: Recipe[], inputString: string) {
        if (items.length === 0)
            return [];
        else {
            const searchString = inputString.trim().toLowerCase();
            return items.filter(r => r.name.toLowerCase().includes(searchString))
        }
    }
}