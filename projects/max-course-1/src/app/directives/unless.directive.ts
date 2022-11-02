import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective implements OnChanges {
    //@Input() appUnless : boolean;
    @Input() set appUnless(condition: boolean) {
        if (!condition) {
            this.vcRef.createEmbeddedView(this.template);
        } else {
            this.vcRef.clear();
        }
    }

    constructor(private template: TemplateRef<any>, private vcRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        
    }

    /*ngOnChanges(changes: SimpleChanges): void {
        if ('appUnless' in changes) {
            if (changes['appUnless'].currentValue) {
                this.vcRef.clear();
            } else {
                this.vcRef.createEmbeddedView(this.template);
            }
        }
    }*/
}