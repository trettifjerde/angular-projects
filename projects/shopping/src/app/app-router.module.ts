import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { EmptyComponent } from "./shared/empty/empty.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Route[] = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'list', component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent },
    //{ path: '**', component: EmptyComponent, data: {message: 'Page not found'}}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {}