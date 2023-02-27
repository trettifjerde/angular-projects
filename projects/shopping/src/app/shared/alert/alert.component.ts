import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Toast } from "../../store/general.store";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() toast: Toast = {message: '', isError: false};
}