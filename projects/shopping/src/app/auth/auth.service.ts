import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User, UserInterface } from "./user.model";

export interface AuthSignUpResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface AuthSignInResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}
interface AuthRequest {
    email: string,
    password: string,
    returnSecureToken: boolean
}

export interface SignForm {
    email: string,
    password: string
}

function castFormToAuthRequest(form: SignForm): AuthRequest {
    return {email: form.email, password: form.password, returnSecureToken: true};
}

@Injectable({providedIn: 'root'})
export class AuthService {
    signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVjawArzDll20acHgeHZWuymViGGRBtvg';
    signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVjawArzDll20acHgeHZWuymViGGRBtvg';

    user = new BehaviorSubject<User>(null);
    logoutTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signUp(form: SignForm) : Observable<AuthSignUpResponse> {
        return this.http.post<AuthSignUpResponse>(
            this.signUpUrl, castFormToAuthRequest(form)).pipe(
                tap(res => this.handleAuthentication(res)),
                catchError(error => this.handleError(error))
            );
    }

    signIn(form: SignForm) : Observable<AuthSignInResponse> {
        return this.http.post<AuthSignInResponse>(
            this.signInUrl, castFormToAuthRequest(form)).pipe(
                tap(res => this.handleAuthentication(res)),
                catchError(error => this.handleError(error))
            );
    }

    logout() {
        this.user.next(null);
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
        localStorage.removeItem('userData');
        this.router.navigate(['/recipes']);
    }

    autoLogin() {
        const userData: UserInterface = JSON.parse(localStorage.getItem('userData'));
        if (!userData) 
            return;

        const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (user.token) {
            this.user.next(user);
            const expiresIn = user.tokenExpirationDate - new Date().getTime();
            this.autoLogout(expiresIn);
        }
    }

    autoLogout(expirationDuration: number) {
        console.log('Remaining session time: ', expirationDuration);
        this.logoutTimer = setTimeout(this.logout.bind(this), expirationDuration);
    }

    private handleAuthentication(res: AuthSignUpResponse|AuthSignInResponse) {
        const expiresIn = +res.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        const user = new User(res.email, res.localId, res.idToken, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn);
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg = 'An error has occurred';
        if (error?.error?.error?.message){
            switch(error.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMsg = 'This email is already registered';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMsg = 'Too many login attempts. Try again later';
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    errorMsg = 'Invalid login or password';
                    break;
                case 'USER_DISABLED':
                    errorMsg = 'User has been disabled';
                    break;
            }
        }
        return throwError(() => new Error(errorMsg));
    }
}