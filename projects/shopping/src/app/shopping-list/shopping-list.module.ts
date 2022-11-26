import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ShoppingListComponent, canActivate: [AuthGuard] }
        ]), 
    ],
})
export class ShoppingListModule {}