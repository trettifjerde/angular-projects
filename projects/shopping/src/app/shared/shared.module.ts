import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { DnD } from "./dnd.directive";
import { Dropdown } from "./dropdown/dropdown.component";
import { EmptyComponent } from "./empty/empty.component";
import { FilterPipe } from "./filter.pipe";
import { CustomInputDirective } from "./input.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { Modal } from "./modal/modal.component";
import { ShortenPipe } from "./shorten.pipe";
import { PasswordMatch } from "./validators.directive";

@NgModule({
    declarations: [
        AlertComponent,
        EmptyComponent,
        LoadingSpinnerComponent,
        ShortenPipe,
        FilterPipe,
        CustomInputDirective,
        PasswordMatch,
        DnD,
        Modal,
        Dropdown
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
        ShortenPipe,
        FilterPipe,
        CustomInputDirective,
        PasswordMatch,
        DnD,
        Modal,
        Dropdown
    ]
})
export class SharedModule {}