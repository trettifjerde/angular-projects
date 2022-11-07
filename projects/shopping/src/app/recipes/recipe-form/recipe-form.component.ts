import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable} from "rxjs";
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

    constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if ('id' in params) {
                this.id = +params['id'];
                const recipe = this.recipeService.getRecipe(this.id);
                this.recipeForm = this.createRecipeForm(recipe);
            }
            else {
                this.id = null;
                this.recipeForm = this.createRecipeForm();
            }
        })
    }

    nameUnique(control: FormControl) : Observable<any> | Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (! this.recipeService.isUniqueName(control.value, this.id))
                    resolve({'recipeNameExists': true });
                else
                    resolve(null);
            }, 1000);
        });
    }

    createRecipeForm(recipe: Recipe | null = null) : FormGroup {
        const form = new FormGroup({
            'name': new FormControl(null, [Validators.required], [this.nameUnique.bind(this)]),
            'description': new FormControl(null, [Validators.required]),
            'imagePath': new FormControl(null),
            'ingredients': new FormArray([], [Validators.required]),
        });
        if (recipe) {
            form.setValue({
                'name': recipe.name,
                'description': recipe.description,
                'imagePath': recipe.imagePath,
                'ingredients': []
            });
            recipe.ingredients.forEach(ing => this.addNewIngredientToForm(form, ing));
        }
        else {
            this.addNewIngredientToForm(form);
        }
        return form;
    }

    isValidIngredient(control: FormControl) : boolean {
        return true;
    }

    getFormIngredients() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onSubmit() {
        const recipe = new Recipe(
            this.recipeForm.value.name, 
            this.recipeForm.value.description,
            this.recipeForm.value.imagePath,
            []
        );
        (<{name: string, amount: string}[]>this.recipeForm.value.ingredients).forEach(ing => 
            recipe.ingredients.push(new Ingredient(ing.name, +ing.amount))
        );
        
        if (this.id !== null) {
            this.recipeService.updateRecipe(this.id, recipe);
            this.router.navigate(['/recipes', this.id]);
        } 
        else {
            const id = this.recipeService.addRecipe(recipe);
            this.router.navigate(['/recipes', id]);
        }

    }

    createIngredientGroup(ing?: Ingredient) : FormGroup {
        const ingGroup = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'amount': new FormControl(null, [Validators.required])
        });
        if (ing) {
            ingGroup.setValue({
                'name': ing.name,
                'amount': ing.amount
            });
        }
        return ingGroup;
    }

    addNewIngredientToForm(form: FormGroup, ing: Ingredient | null = null) {
        (<FormArray>form.get('ingredients')).push(this.createIngredientGroup(ing));
    }

    deleteIngredient(i: number) {
        const ingredients = (<FormArray>this.recipeForm.get('ingredients'))
        ingredients.removeAt(i);
        if (ingredients.length === 0) {
            this.addNewIngredientToForm(this.recipeForm);
        }
    }

}