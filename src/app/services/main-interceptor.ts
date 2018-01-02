import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class MainInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercepting Request On: ", req.method+" "+ "METHOD");
        // console.log("REQ BODY: ", req);
        if(req.url.includes("https://newsapi.org/")){
            return next.handle(req);
        }
        req = req.clone({
            setHeaders: {
              Authorization: `${localStorage.getItem('idToken')}`
            }
          });
      
          return next.handle(req);

    }

}