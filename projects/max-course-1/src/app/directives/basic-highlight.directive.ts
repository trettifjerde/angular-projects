import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding, Input } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    @Input() defaultColor = '';
    @Input() highlightColor = 'wheat';

    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.backgroundColor = this.defaultColor;
        //this.renderer.setStyle(this.el.nativeElement, 'background-color', 'wheat');
    }

    @HostListener('mouseenter') mouseOver(data: Event) {
        //this.renderer.setStyle(this.el.nativeElement, 'background-color', 'wheat');
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseLeave(data: Event) {
        //this.renderer.setStyle(this.el.nativeElement, 'background-color', '');
        this.backgroundColor = this.defaultColor;
    }
}