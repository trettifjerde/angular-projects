import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit  {
    ddMenu: HTMLElement;
    btn: HTMLElement;
    visible = false;

    constructor(private dd: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.visible = false;
        this.btn = this.dd.nativeElement.querySelector('.dropdown-toggle');
        this.ddMenu = this.dd.nativeElement.querySelector('.dropdown-menu');
    }

    @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
       if (this.dd.nativeElement.contains(event.target)) {
        this.visible = !this.visible;
        this.visible ? this.renderer.addClass(this.ddMenu, 'show') : this.renderer.removeClass(this.ddMenu, 'show');
       }
       else if (this.visible) {
        this.visible = false;
        this.renderer.removeClass(this.ddMenu, 'show');
       }
    }
}