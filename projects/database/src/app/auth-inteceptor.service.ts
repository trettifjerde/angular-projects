import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
    url = 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({
            url: this.url + req.url,
            headers: new HttpHeaders({'My-Custom-Header!': 'Here-it-goes!'}),
            params: new HttpParams().set('some-params', 'param1').append('meow', 'meow'),
            responseType: 'json' //responseType: 'blob' || 'json' || 'text' etc.
        });

        return next.handle(modifiedRequest);
    }
}