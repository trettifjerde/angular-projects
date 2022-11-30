import { Component,  OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { AppState } from "../store/app.reducer";
import * as authActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    authSubscription: Subscription;
    user: User;

    constructor(private store: Store<AppState>) {}

    logout() {
        this.store.dispatch(new authActions.LogOutAction());
    }

    ngOnInit() {
        this.authSubscription = this.store.select('auth').pipe(
            map(state => state.user)
        )
        .subscribe(
            user => this.user = user
        );
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}