import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./recipes/recipe-form/recipe-form.component";
import { RecipeListResolver, RecipeResolver } from "./recipes/recipe-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { EmptyComponent } from "./shared/empty/empty.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Route[] = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, resolve: {recipes: RecipeListResolver}, children: [
        { path: '', pathMatch: 'full', component: EmptyComponent, data: { message: 'No recipe selected' }},
        { path: 'new', component: RecipeFormComponent, resolve: {recipe: RecipeResolver}, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
        { path: ':id/edit', component: RecipeFormComponent, resolve: {recipe: RecipeResolver}, canActivate: [AuthGuard] }
    ] },
    { path: 'list', component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent },
    { path: '**', redirectTo: '/recipes'}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {}