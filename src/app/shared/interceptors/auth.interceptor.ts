import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

/**
 * Intercept all the http request, and add token in header if exist for security
 */
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AuthService.LOCAL_JWT );
    if ( token ) {
      const authReq = req.clone({
        setHeaders: {
          authorization: token
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }

}
