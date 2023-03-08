import { Component, EventEmitter, Input, Output } from "@angular/core";
import { modal, modalContent, modalShadow } from "./modal.animations";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    animations: [modal, modalContent, modalShadow]
})
export class Modal {
    @Input() name: string | null;
    @Input() text: string;
    @Output() onClose = new EventEmitter();
    @Output() onConfirm = new EventEmitter();
}