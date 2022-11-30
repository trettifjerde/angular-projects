import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import * as authActions from "./store/auth.actions";
import { AppState } from "../store/app.reducer";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isSignUpMode= false;
    isLoading: boolean;
    error: string;
    authSubscription: Subscription;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.authSubscription = this.store.select('auth').subscribe(
            state => {
                this.error = state.authError;
                this.isLoading = state.loading;
            }
        )
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    toggleForm() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid)
            return;

        const formValue = form.form.value;

        if (this.isSignUpMode) {
            this.store.dispatch(new authActions.SignUpStartAction(formValue));
        }
        else {
            this.store.dispatch(new authActions.LogInStartAction(formValue));
        }
    }
}