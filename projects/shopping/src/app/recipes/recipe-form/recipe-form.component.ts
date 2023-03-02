import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IngredientRaw } from "../../shared/ingredient.interface"; 
import { AppState } from "../../store/app.reducer";
import { setSubmitting } from "../../store/general.store";
import { Recipe } from "../recipe.model";
import * as recipeActions from '../store/recipes.actions';
import { FormArrayEmpty, ArrayContainsInvalidControl, ArrayContainsInvalidFormGroup } from "./formarray.validator";
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { confirmAction} from '../../shared/utils';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    recipe: Recipe | null;
    recipeForm: FormGroup;

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

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
            'ingredients': new FormArray(ingredients, [FormArrayEmpty, ArrayContainsInvalidFormGroup]),
            'steps': new FormArray(steps, [FormArrayEmpty, ArrayContainsInvalidControl])
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

    createStep(step: string = '') : FormControl {
        return new FormControl(step, [Validators.required, Validators.maxLength(1000)]);
    }

    createIngredientGroup(ing?: IngredientRaw): FormGroup {
        const ingRaw = ing ? ing : new IngredientRaw();

        return new FormGroup({
            'name': new FormControl(ingRaw.name, [Validators.required]),
            'amount': new FormControl(ingRaw.amount, [Validators.min(0.01)]),
            'unit': new FormControl({value: ingRaw.unit, disabled: !ingRaw.amount}),
        });
    }

    deleteIngredient(i: number) {
        const ing = this.ingredients.at(i);
        const emtpy = !ing.get('name').value && !ing.get('amount').value && !ing.get('unit').value;
        if (emtpy)
            this.ingredients.removeAt(i);
        else 
            confirmAction('Delete ingredient?', () => this.ingredients.removeAt(i));
    }

    deleteStep(i: number){
        if (this.steps.at(i).value)
            confirmAction('Delete step?', () => this.steps.removeAt(i));
        else
            this.steps.removeAt(i);
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

    onSubmit() {
        this.store.dispatch(setSubmitting({status: true}));
        if (this.recipe) 
            this.store.dispatch(new recipeActions.StartUpdateRecipe([this.recipe.id, this.recipeForm.value]));
        else 
            this.store.dispatch(new recipeActions.StartAddRecipe({...this.recipeForm.value}));
    }

    drop(event: CdkDragDrop<any[]>) {
        const prevI = event.previousIndex;
        const curI = event.currentIndex;
        const item = this.steps.at(prevI);
        this.steps.removeAt(prevI);
        this.steps.insert(curI, item);
    }

    moveStep(i: number, adjust: number) {
        const item = this.steps.at(i);
        const newI = i + adjust;
        if (newI >=0 && newI < this.steps.length) {
            this.steps.removeAt(i);
            this.steps.insert(newI, item);
        }
    }

}