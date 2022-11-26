import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({selector: 'input'})
export class TrimDirective {

    constructor(private el: ElementRef) {}

    @HostListener('blur') trimInput() {
        this.el.nativeElement.value = this.el.nativeElement.value.trim();
    }
}

@Directive({selector: '[lower]'})
export class LowerCaseDirective {
    constructor(private el: ElementRef) {}

    @HostListener('blur') toLower() {
        this.el.nativeElement.value = (<HTMLInputElement>this.el.nativeElement).value.toLowerCase();
    }
}

@Directive({selector: '[lettersOnly]'})
export class LettersOnlyDirective {
    constructor(private el: ElementRef) {}

    @HostListener('blur') clear() {
        this.el.nativeElement.value = (<HTMLInputElement>this.el.nativeElement).value.replaceAll(/\d|\W/g, '');
    }
}