import { animate, keyframes, query, state, style, transition, trigger, } from "@angular/animations";
import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";

export const dropdownAnimations = trigger(
    'dropdownState', [
        state('open', style({display: 'block'})),
        transition('closed => open', [
            style({display: 'block'}),
            query('.dropdown-menu-inner', animate(150, keyframes([
                style({opacity: 0, transform: 'translateY(-100%)'}),
                style({opacity: 1, transform: 'translateY(0%)'}),
            ])))
        ]),
        transition('open => closed', [
            query('.dropdown-menu-inner', animate(150, keyframes([
                style({opacity: 1, transform: 'translateY(0%)'}),
                style({opacity: 0, transform: 'translateY(-100%)'}),
            ])))
        ])
    ]
)

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    animations: [dropdownAnimations]
})
export class Dropdown {
    visible = false;
    @ViewChild('btn', {static: true}) btn: ElementRef;

    constructor() {}

    @HostListener('document:click', ['$event.target']) toggleVisibility(target: HTMLElement) {
        if (this.visible) {
            this.visible = false;
        }
        else if (target === this.btn.nativeElement) {
            this.visible = true;
        }
    }
}