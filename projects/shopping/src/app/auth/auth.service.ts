import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, Observable, throwError } from "rxjs";
import { AppState } from "../store/app.reducer";
import { User, UserInterface } from "./user.model";
import { environment } from "../../environments/environment";
import * as authActions from './store/auth.actions.newer';

export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
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
    signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.authKey}`;
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.authKey}`;
    logoutTimer: any;

    constructor(private http: HttpClient, private store: Store<AppState>) {}

    authenticate(form: SignForm, url: string): Observable<User> {
        return this.http.post<AuthResponse>(
            url, castFormToAuthRequest(form)).pipe(
                map(res => this.handleAuthentication(res)),
                catchError(error => this.handleError(error))
            )
    }

    signUp(form: SignForm): Observable<User> {
        return this.authenticate(form, this.signUpUrl);
    }

    signIn(form: SignForm): Observable<User> {
        return this.authenticate(form, this.signInUrl);
    }

    logout() {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
        localStorage.removeItem('userData');
    }

    autoLogin() {
        const userData : UserInterface = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (user.token) {
                this.setAutoLogout(user.tokenExpirationTime);
                this.store.dispatch(authActions.autoLogIn({user: user}));
            }
            else {
                localStorage.removeItem('userData');
            }
        }
    }

    setAutoLogout(expiresIn: number) {
        console.log('setting logout timer to', expiresIn, 'ms');
        this.logoutTimer = setTimeout(() => this.store.dispatch(authActions.logOut()), expiresIn);
    }

    private handleAuthentication(res: AuthResponse): User {
        const expiresIn = +res.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        const user = new User(res.email, res.localId, res.idToken, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.setAutoLogout(expiresIn);
        return user;
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg = 'An error has occurred';
        console.log(error);
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