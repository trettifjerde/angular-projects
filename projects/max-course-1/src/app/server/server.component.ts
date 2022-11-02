import { Component, Input, OnInit } from "@angular/core";
import { Server } from "../server.model";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
    .online {background-color: lightgreen;}
    .offline {background-color: #faaec7;}
    .server { padding: 1rem; transition: all .3s ease-in-out; cursor: pointer;}
    `]
})
export class ServerComponent implements OnInit {
    @Input() server: Server = new Server('', false);

    constructor() {}

    ngOnInit(): void {}

    getServerStatus() {
        return this.server.status ? 'on' : 'off';
    }
}