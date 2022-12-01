import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ShoppingListService } from '../../services/shopping-list.service';
import { AuthService } from "../auth.service";
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private listService: ShoppingListService, 
        private router: Router) {}
    
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOG_IN_START),
        switchMap((authData: authActions.LogInStartAction) => this.authService.signIn(authData.payload).pipe(
            map(user => new authActions.LogInAction(user)),
            catchError(err => of(new authActions.AuthenticationFailed(err.message))),
        ))
    ));

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(authActions.SIGN_UP_START),
        switchMap((authData: authActions.SignUpStartAction) => this.authService.signUp(authData.payload).pipe(
            map(user => new authActions.SignUpAction(user)),
            catchError(err => of(new authActions.AuthenticationFailed(err.message)))
        ))
    ));

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOG_OUT),
        tap(() => {
            this.listService.clearIngredients();
            this.authService.logout();
            this.router.navigate(['/']);
        })
    ), {dispatch: false});

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOG_IN, authActions.SIGN_UP, authActions.AUTO_LOG_IN),
        tap((action: authActions.AuthAction) => {
            this.listService.fetchIngredients();
            if(action.type !== authActions.AUTO_LOG_IN)
                this.router.navigate(['/']);
        }),
    ), {dispatch: false});

}