import { Component, ContentChild, ElementRef, Input, OnInit, Output, ViewChild } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: 'app-server-edit',
    templateUrl: './server-edit.component.html',
    styles: [`
    .message { opacity: 0; visibility: hidden; transition: all .3s ease-in-out; height: 2rem; line-height: 1.5;}
    .message.visible { opacity: 1; visibility: visible;}
    `]
})
export class ServerEditComponent implements OnInit {
    @Input() createAllowed = false;
    @Output() serverCreated: EventEmitter<string> = new EventEmitter();
    @ViewChild('newServerName', {static: true}) serverNameInput: ElementRef;

    serverCreatedMessage = '';

    ngOnInit() {
        console.log(this.serverNameInput.nativeElement.value);
    }

    onCreateServer() {
        if (this.serverNameInput.nativeElement.value) {
            const value = this.serverNameInput.nativeElement.value;
            this.serverCreated.emit(value);
            this.serverCreatedMessage = `New server with name ${value} created`;
            let timer = setTimeout(() => {
                this.serverCreatedMessage = '';
                clearTimeout(timer);
            }, 2000);
        }
    }
}