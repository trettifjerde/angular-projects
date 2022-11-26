import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { EmptyComponent } from "./shared/empty/empty.component";


const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: '/recipes'},
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    { path: 'list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    { path: 'login', component: AuthComponent },
    { path: '**', component: EmptyComponent, data: {message: 'Page not found'}}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRouterModule {}