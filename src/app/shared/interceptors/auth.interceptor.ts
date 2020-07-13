import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

/**
 * Intercept all the http request, and add token in header if exist for security
 */
export class AuthInterceptor implements HttpInterceptor {


  /**
   * add a token in header if found in localStorage,
   * to get access to protected datas in backend
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AuthService.LOCAL_JWT );
    if ( token ) {
      let authReq = req.clone({
        setHeaders: {
          authorization: token,
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }
}
