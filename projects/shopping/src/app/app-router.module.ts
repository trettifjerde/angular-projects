import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { EmptyComponent } from "./shared/empty/empty.component";
import { NonAuthGuard } from "./auth/auth-guard.service";


const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: '/recipes'},
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    { path: 'list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    { path: 'login', component: AuthComponent, canActivate: [NonAuthGuard]},
    { path: '**', component: EmptyComponent, data: {message: 'Page not found'}}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRouterModule {}