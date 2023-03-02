import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { DisableUnitDirective } from "./recipe-form/disable-unit.directive";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeFormComponent,
        DisableUnitDirective,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule, 
        RecipesRoutingModule,
        DragDropModule,
    ]
})
export class RecipesModule {}