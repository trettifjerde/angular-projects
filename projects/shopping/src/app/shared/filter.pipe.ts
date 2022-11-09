import { Pipe, PipeTransform } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";

@Pipe({name: 'recipeFilter'})
export class FilterPipe implements PipeTransform {
    transform(items: Recipe[], searchString: string) {
        if (items.length === 0)
            return items;
        
        const recipeString = searchString.toLowerCase();
        return items.filter(r => r.name.toLowerCase().includes(recipeString));
    }
}