import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class DBInterseptorService implements HttpInterceptor {
    url = 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app/';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modReq = req.clone({
            url: this.url + req.url + '.json'
        })
        return next.handle(modReq);
    }
}