import { Component, OnInit } from '@angular/core';
import { Server } from '../server.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  servers: Server[] = [
    new Server('SolidGames 1', true)
  ];
  allowNewServer = true;
  offlineHidden = false;

  constructor() { }

  ngOnInit(): void {
  }

  onServerCreated(serverName: string) {
    this.servers.push(new Server(serverName, false));
  }

  toggleOfflineServers() {
    this.offlineHidden = !this.offlineHidden;
  }

}
