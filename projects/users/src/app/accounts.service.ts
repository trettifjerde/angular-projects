import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging/logging.service";

@Injectable({providedIn: 'root'})
export class AccountService {
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

    statusUpdated = new EventEmitter<string>();

    constructor(public loggingService: LoggingService) {}

    addAccount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
        this.loggingService.logStatusChange(status);
    }

    updateAccount(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}