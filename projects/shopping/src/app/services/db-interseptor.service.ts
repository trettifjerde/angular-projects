import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, switchMap, take } from "rxjs";
import { AppState } from "../store/app.reducer";

@Injectable()
export class DBInterseptorService implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(info => info.user),
            switchMap(user => {
                if (!user) 
                    return next.handle(req);
                    
                const modReq = req.clone({
                    params: req.params.set('auth', user.token)
                });
                return next.handle(modReq);
            })
        )

    }
}