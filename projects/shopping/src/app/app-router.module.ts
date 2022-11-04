import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./recipes/recipe-form/recipe-form.component";
import { RecipeResolver } from "./recipes/recipe-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { EmptyComponent } from "./shared/empty/empty.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Route[] = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', pathMatch: 'full', component: EmptyComponent, data: { message: 'No recipe selected' }},
        { path: 'new', component: RecipeFormComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeFormComponent }
    ] },
    { path: 'list', component: ShoppingListComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {}