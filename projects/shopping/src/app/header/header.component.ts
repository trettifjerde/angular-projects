import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() linkClick = new EventEmitter<number>();
    dropdownOpen = false;

    toggleDropdown(event : Event) {
        if (!this.dropdownOpen) {
            event.stopPropagation();
            this.dropdownOpen = true;
            document.addEventListener('click', (e) => {
                this.dropdownOpen = false;
            });
        }
    }

    onLinkClicked(n: number) {
        this.linkClick.emit(n);
    }
}