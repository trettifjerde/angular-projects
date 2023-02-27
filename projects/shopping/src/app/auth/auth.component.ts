import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as authActions from "./store/auth.actions.newer";
import { AppState } from "../store/app.reducer";
import { setSubmitting } from "../store/general.store";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isSignUpMode= false;

    constructor(private store: Store<AppState>) {}

    toggleForm() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid)
            return;

        const formValue = form.form.value;

        this.store.dispatch(setSubmitting({status: true}));

        if (this.isSignUpMode)
            this.store.dispatch(authActions.signUpStart({form: formValue}));
        else 
            this.store.dispatch(authActions.logInStart({form: formValue}));
    }
}