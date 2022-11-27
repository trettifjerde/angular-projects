import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { EmptyComponent } from "./empty/empty.component";
import { FilterPipe } from "./filter.pipe";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ShortenPipe } from "./shorten.pipe";

@NgModule({
    declarations: [
        AlertComponent,
        EmptyComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        ShortenPipe,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        AlertComponent,
        EmptyComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        ShortenPipe,
        FilterPipe,
    ]
})
export class SharedModule {}