import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name='', desc='', iPath='', ingredients=[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = iPath;
        this.ingredients = ingredients;
    }
}
