import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    loggedIn = false;
    statusUpdate = new EventEmitter<boolean>();

    login() {
        this.loggedIn = true;
        this.statusUpdate.emit(this.loggedIn);
    }

    logout() { 
        this.loggedIn = false; 
        this.statusUpdate.emit(this.loggedIn);
    }

    isAuthenticated() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 400);
        })
    }
}