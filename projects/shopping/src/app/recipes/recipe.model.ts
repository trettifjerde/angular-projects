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

    getImagePath() {
        return this.imagePath ? this.imagePath : 'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg';
    }
}
