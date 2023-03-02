import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from "@angular/core";

@Directive({
    selector: '[disableUnitIfNoAmount]'
})
export class DisableUnitDirective implements AfterViewInit {

    unit: HTMLInputElement;
    
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.unit = this.el.nativeElement.closest('.ingred-cont').querySelector('input[type=text]');
    }

    @HostListener('input', ['$event.target.value']) onInput(amountValue: string) {
        this.renderer.setProperty(this.unit, 'disabled', !amountValue);
        if (!amountValue) {
            this.unit.value = '';
        }
    }
 
}