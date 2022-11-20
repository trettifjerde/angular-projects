import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
import { Ingredient } from "../../shared/ingredient.interface"; 
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    recipe: Recipe | null;
    recipeForm: FormGroup;

    constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.recipe = data['recipe'];
                this.createRecipeForm();
            }
        )
    }

    get name() {
        return this.recipeForm.get('name');
    }
    get description() {
        return this.recipeForm.get('description');
    }

    get ingredients() {
        return <FormArray>this.recipeForm.get('ingredients');
    }

    createRecipeForm() {
        let name = '';
        let imagePath = '';
        let description = '';
        let ingredients = [];

        if (this.recipe) {
            ({ name, description, imagePath } = this.recipe);
            ingredients = this.recipe.ingredients.map(ing => this.createIngredientGroup(ing));
        }
        else
            ingredients.push(this.createIngredientGroup());

        this.recipeForm = new FormGroup({
            'name': new FormControl(name, [Validators.required]),
            'description': new FormControl(description, [Validators.required]),
            'imagePath': new FormControl(imagePath),
            'ingredients': new FormArray(ingredients, [Validators.required]),
        });
    }

    /*createRecipeFromForm(): Recipe {
        return (
            ({ name, description, imagePath, ingredients }) => { 
                return new Recipe(
                    name, 
                    description, 
                    imagePath, 
                    ingredients.map(ing => new Ingredient(ing.name, ing.amount))
                ); 
            }
        )(this.recipeForm.value);

        /* 
        return new Recipe(
            this.recipeForm.value.name,
            this.recipeForm.value.description,
            this.recipeForm.value.imagePath,
            this.recipeForm.value.ingredients.map(ing => new Ingredient(ing.name, ing.amount))
        ); 

    }
    */

    onSubmit() {
        if (this.recipe) {
            this.recipeService.updateRecipe(this.recipe.id, this.recipeForm.value).subscribe(
                () => this.router.navigate(['/recipes', this.recipe.id])
            );
        }
        else {
            this.recipeService.addRecipe(this.recipeForm.value).subscribe(
                recipeId => this.router.navigate(['/recipes', recipeId])
            );
        }
    }

    createIngredientGroup(ing?: Ingredient): FormGroup {
        let name = '';
        let amount = 0;

        if (ing) ({ name, amount } = ing);

        return new FormGroup({
            'name': new FormControl(name, [Validators.required]),
            'amount': new FormControl(amount, [Validators.required])
        });
    }

    deleteIngredient(i: number) {
        const ingredients = (<FormArray>this.recipeForm.get('ingredients'))
        ingredients.removeAt(i);
    }

    addIngredientGroup() {
        this.ingredients.push(this.createIngredientGroup());
    }

    cancelEdit() {
        this.recipe ? this.router.navigate(['/recipes', this.recipe.id]) : this.router.navigate(['/recipes']);
    }

}