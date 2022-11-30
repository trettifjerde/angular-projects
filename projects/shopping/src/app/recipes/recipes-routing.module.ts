import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";
import { EmptyComponent } from "../shared/empty/empty.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    { path: '', component: RecipesComponent, children: [
        { path: '', pathMatch: 'full', component: EmptyComponent, data: { message: 'No recipe selected' }},
        { path: 'new', component: RecipeFormComponent, resolve: {recipe: RecipeResolver}, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
        { path: ':id/edit', component: RecipeFormComponent, resolve: {recipe: RecipeResolver}, canActivate: [AuthGuard] }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}