import { Ingredient } from "../shared/ingredient.interface"; 

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public steps: string[];
    public id: string;

    constructor({name, id, description, imagePath, ingredients, steps}) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    get imgSrc() {
        return this.imagePath ? this.imagePath : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg';
    }
}

export interface RecipeRaw {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
    steps: string[];
}