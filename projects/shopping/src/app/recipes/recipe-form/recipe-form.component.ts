import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";
import { IngredientRaw } from "../../shared/ingredient.interface"; 
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    @ViewChild('pageTop') pageTop: ElementRef;
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

    ngAfterViewInit() {
        this.pageTop.nativeElement.scrollIntoView(true);
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

    get steps() {
        return <FormArray>this.recipeForm.get('steps');
    }

    createRecipeForm() {
        let name = '';
        let imagePath = '';
        let description = '';
        let ingredients = [];
        let steps = [];

        if (this.recipe) {
            ({ name, description, imagePath } = this.recipe);
            ingredients = this.recipe.ingredients.map(ing => this.createIngredientGroup(ing));
            steps = this.recipe.steps.map(step => this.createStep(step));
        }
        else {
            ingredients.push(this.createIngredientGroup());
            steps.push(this.createStep());
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(name, [Validators.required]),
            'description': new FormControl(description, [Validators.required]),
            'imagePath': new FormControl(imagePath),
            'ingredients': new FormArray(ingredients, [Validators.required]),
            'steps': new FormArray(steps, [Validators.required])
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
                () => {
                    console.log(this.route);
                    this.router.navigate(['../'], {relativeTo: this.route});
                }
            );
        }
        else {
            this.recipeService.addRecipe(this.recipeForm.value).subscribe(
                recipeId => this.router.navigate(['../', recipeId], {relativeTo: this.route})
            );
        }
    }

    createStep(step: string = '') : FormControl {
        return new FormControl(step, [Validators.required, Validators.maxLength(1000)]);
    }

    createIngredientGroup(ing?: IngredientRaw): FormGroup {
        let name = '';
        let amount = '';
        let unit = '';

        if (ing) ({name, amount, unit} = ing)

        return new FormGroup({
            'name': new FormControl(name, [Validators.required]),
            'amount': new FormControl(amount, [Validators.required]),
            'unit': new FormControl(unit),
        });
    }

    deleteIngredient(i: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
    }

    deleteStep(i: number ){
        (<FormArray>this.recipeForm.get('steps')).removeAt(i);
    }

    addIngredientGroup() {
        this.ingredients.push(this.createIngredientGroup());
    }

    addStepControl() {
        this.steps.push(this.createStep());
    }

    cancelEdit() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}