import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownDirective } from "../shared/dropdown.directive";
import { EmptyComponent } from "../shared/empty/empty.component";
import { FilterPipe } from "../shared/filter.pipe";
import { ShortenPipe } from "../shared/shorten.pipe";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        EmptyComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeFormComponent,
        ShortenPipe,
        FilterPipe,
        DropdownDirective
    ],
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule, 
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {}