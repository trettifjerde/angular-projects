import { Component,  OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    authSubscription: Subscription;
    user: User;

    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.authSubscription = this.authService.user.subscribe(
            user => this.user = user
        );
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}