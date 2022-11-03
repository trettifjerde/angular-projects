import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({providedIn: 'root'})
export class UserService {
    activeUsers: string[] = ['Max', 'Anna']
    inactiveUsers: string[] = ['Manu', 'Kesak']

    constructor(private counterService: CounterService) {}

    activate(id: number) {
        const user = this.inactiveUsers.splice(id, 1)[0];
        this.activeUsers.push(user);
        this.counterService.count();
    }
    deactivate(id: number) {
        const user = this.activeUsers.splice(id, 1)[0];
        this.inactiveUsers.push(user);
        this.counterService.count();
    }
}