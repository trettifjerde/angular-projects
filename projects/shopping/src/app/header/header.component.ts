import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() linkClick = new EventEmitter<number>();

    onLinkClicked(n: number) {
        this.linkClick.emit(n);
    }
}