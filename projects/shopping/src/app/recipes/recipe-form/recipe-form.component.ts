import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { RecipesService } from "../../services/recipes.service";
import { Ingredient } from "../../shared/ingredient.model";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    id: number;
    recipeForm: FormGroup;

    constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id'] ? +params['id'] : null;
            this.createRecipeForm();
        })
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

    nameUnique(control: FormControl): Observable<any> | Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.recipeService.isUniqueName(control.value, this.id))
                    resolve({ 'recipeNameExists': true });
                else
                    resolve(null);
            }, 500);
        });
    }

    createRecipeForm() {
        let name = '';
        let imagePath = '';
        let description = '';
        let ingredients = [];

        if (this.id !== null) {
            const recipe = this.recipeService.getRecipe(this.id);
            ({ name, description, imagePath } = recipe);
            ingredients = recipe.ingredients.map(ing => this.createIngredientGroup(ing));
        }
        else
            ingredients.push(this.createIngredientGroup());

        this.recipeForm = new FormGroup({
            'name': new FormControl(name, [Validators.required], [this.nameUnique.bind(this)]),
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
        const recipe = new Recipe(this.recipeForm.value);
        console.log(recipe);

        if (this.id !== null) {
            this.recipeService.updateRecipe(this.id, recipe);
            this.router.navigate(['/recipes', this.id]);
        }
        else {
            const id = this.recipeService.addRecipe(recipe);
            this.router.navigate(['/recipes', id]);
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
        if (this.id === null) {
            this.router.navigate(['/recipes']);
        }
        else {
            this.router.navigate(['/recipes', this.id]);
        }
    }

}