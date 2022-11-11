import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterseptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Outgoing request to ', req.url);
        
        return next.handle(req).pipe(
            tap(event => {
                console.log('Incoming response ', event.type);
            })
        );
    }
}