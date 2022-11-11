import { Ingredient } from "../shared/ingredient.interface"; 

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor({name, description, imagePath, ingredients}) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }

    get imgSrc() {
        return this.imagePath ? this.imagePath : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg';
    }
}

export type RecipeDict = {
    [id: string] : Recipe
}