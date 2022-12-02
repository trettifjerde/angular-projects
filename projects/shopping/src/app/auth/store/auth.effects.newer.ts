import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ShoppingListService } from '../../services/shopping-list.service';
import { AuthService } from "../auth.service";
import * as authActions from './auth.actions.newer';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private listService: ShoppingListService, 
        private router: Router) {}
    
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(authActions.logInStart),
        switchMap(({form}) => this.authService.signIn(form).pipe(
            map(user => authActions.logIn({user: user})),
            catchError(err => of(authActions.authFailed({error: err.message}))),
        ))
    ));

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(authActions.signUpStart),
        switchMap(({form}) => this.authService.signUp(form).pipe(
            map(user => authActions.signUp({user: user})),
            catchError(err => of(authActions.authFailed({error: err.message})))
        ))
    ));

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(authActions.logOut),
        tap(() => {
            this.listService.clearIngredients();
            this.authService.logout();
            this.router.navigate(['/']);
        })
    ), {dispatch: false});

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(authActions.logIn, authActions.signUp, authActions.autoLogIn),
        tap(action => {
            this.listService.fetchIngredients();
            if(action.type !== authActions.AUTO_LOG_IN)
                this.router.navigate(['/']);
        }),
    ), {dispatch: false});

}