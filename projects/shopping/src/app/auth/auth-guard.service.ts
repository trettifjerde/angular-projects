import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean  | UrlTree| Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(info => info.user),
            map(user => {
                const isAuth = !!user;
                if (isAuth) 
                    return true;
                else
                    return this.router.createUrlTree(['/login']);
            })
        );
    }

}