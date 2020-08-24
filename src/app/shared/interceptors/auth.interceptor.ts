import { TokenService } from "./../services/token.service";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Intercept all the http request, and add token in header if exist for security
 */
export class AuthInterceptor implements HttpInterceptor {
  //constructor(private tokenService: TokenService) {}

  /**
   * add a token in header if found in localStorage,
   * to get access to protected datas in backend
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append("authtoken", token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
