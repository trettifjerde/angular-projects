import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[dnd]',
})
export class DnD {
    @Input('i') i: number;
    @HostBinding('class.dragged') dragged = false;

    constructor() {}

    prevent(event: DragEvent) {
        console.log(event.type);
        event.preventDefault();
        event.stopPropagation();
    }
    
    @HostListener('dragstart', ['$event']) dragstart(event: DragEvent) {
        this.prevent(event);
        event.dataTransfer.setData('text/plain', this.i.toString());
        event.dataTransfer.effectAllowed = 'move';
    }

    @HostListener('dragend', ['$event']) dragend(event: DragEvent) {
        this.prevent(event);
        this.dragged = false;
    }

    @HostListener('dragover', ['$event']) dragover(event: DragEvent) {
        this.prevent(event);
        console.log('li');
        this.dragged = true;
    }

    @HostListener('dragleave', ['$event']) dragleave(event: DragEvent) {
        this.prevent(event);
        this.dragged = false;
    }

    @HostListener('drop', ['$event']) drop(event: DragEvent) {
        this.prevent(event);
        this.dragged = false;
        console.log('LI ', event.dataTransfer.getData('text/plain'));
        console.log('is draged to pos.', this.i);
    }
}