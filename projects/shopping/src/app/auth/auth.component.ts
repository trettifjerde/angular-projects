import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthSignInResponse, AuthSignUpResponse, SignForm } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isSignUpMode= false;
    isLoading = false;
    error: string | null = null;

    constructor(private authService: AuthService, private router: Router) {}

    toggleForm() {
        this.isSignUpMode = !this.isSignUpMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid)
            return;

        this.isLoading = true;
        const formValue = form.form.value;

        const authObs = this.isSignUpMode ? this.authService.signUp(formValue) : this.authService.signIn(formValue);
        authObs.subscribe({
            next: (res) => {
                console.log(res),
                this.isLoading = false;
                this.router.navigate(['/list']);
            },
            error: (error) => {
                this.error = error;
                this.isLoading = false;
            }
        });
    }
}