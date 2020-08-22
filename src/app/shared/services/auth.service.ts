import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subscription, timer } from "rxjs";
import { Router } from "@angular/router";
import { map, switchMap, tap } from "rxjs/operators";
import { JwtToken } from "../models/jwt.token";

/**
 * Auth.Service work with JWT token sent from backend.
 * Manage signIn and signOut
 * It store the user's token at local value and refresh it with the timer (all 5 minutes)
 * If token is not good at refresh, send the user in connection's route
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  static headers: {
    "Access-Control-Allow-Origin": "*";
  };

  /**
   * LOCAL_JWT is just the name used to store the token in local.
   * To avoid confusion, the name of enigmaDDR is mentioned
   */
  private static LOCAL_JWT = "enigmaJDR_jwt";
  /**
   * the subscription need to be stored for unsubscribe if the timer
   * used to check token must stop.
   */
  subscription: Subscription;
  /**
   * the jwtToken is dynamically used with a BehaviorSubject,
   * dirrectly used in player's components to get status of connection
   * (if user is not connected, kik him out of game with router)
   */
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null,
  });
  /**
   * AuthService is build from main app component
   * @param http: call backend api for tokens in signIn, signUp, or refreshToken methods
   * @param router: used to redirect user on connection page if auth fail
   */
  constructor(private http: HttpClient, private router: Router) {
    this.initToken();
    //this.subscription = this.initTimer();
  }
  /**
   * init token check local storage to get token.
   * If got a token, put it in jwtToken observable,
   * else set observable jwt to null and navigate to connection
   */
  private initToken(): void {
    const token = localStorage.getItem(AuthService.LOCAL_JWT);
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token,
      });
    } else if (localStorage.getItem("confirm")) {
      // console.log("auth can confirm");
      // this.jwtToken.next({
      //   isAuthenticated: false,
      //   token: null,
      // });
    } else {
      // this.jwtToken.next({
      //   isAuthenticated: false,
      //   token: null,
      // });
      // this.router.navigate(["connexion"]);
    }
  }
  public setToken(token: string) {
    localStorage.setItem(AuthService.LOCAL_JWT, token);
    this.jwtToken.next({
      isAuthenticated: true,
      token,
    });
  }
  /**
   * initTimer run a timer to refresh token every 5 minutes.
   * Call to backend a new token. If done, update jwtToken observable for all
   * Else, kik off, go back to connexion route
   */
  // public initTimer() {
  //   return timer(30000, 15000)
  //     .pipe(
  //       switchMap(() => {
  //         if (localStorage.getItem(AuthService.LOCAL_JWT)) {
  //           return this.http
  //             .get<string>(`${environment.apiURL}/refreshToken`)
  //             .pipe(
  //               tap((token: string) => {
  //                 this.jwtToken.next({
  //                   isAuthenticated: true,
  //                   token,
  //                 });
  //                 localStorage.setItem(AuthService.LOCAL_JWT, token);
  //               })
  //             );
  //         } else {
  //           this.router.navigate(["connexion"]);
  //           return of(null);
  //         }
  //       })
  //     )
  //     .subscribe(
  //       () => {},
  //       (err) => {
  //         this.jwtToken.next({
  //           isAuthenticated: false,
  //           token: null,
  //         });
  //         localStorage.removeItem(AuthService.LOCAL_JWT);
  //         if (this.subscription) {
  //           this.subscription.unsubscribe();
  //         }
  //       }
  //     );
  // }
  refreshToken() {
    return this.http.get<string>(`${environment.apiURL}/refreshToken`).pipe(
      tap((token: string) => {
        if (token) {
          this.jwtToken.next({
            isAuthenticated: true,
            token: token,
          });
          localStorage.setItem(AuthService.LOCAL_JWT, token);
        } else {
          this.jwtToken.next({
            isAuthenticated: false,
            token: null,
          });
          localStorage.setItem(AuthService.LOCAL_JWT, token);
        }
      })
    );
  }
  newToken(values: Object) {
    return this.http
      .post<string>(`${environment.apiURL}/newToken`, values)
      .pipe(
        tap((token: string) => {
          if (token) {
            this.jwtToken.next({
              isAuthenticated: true,
              token: token,
            });
            localStorage.setItem(AuthService.LOCAL_JWT, token);
          } else {
            this.jwtToken.next({
              isAuthenticated: false,
              token: null,
            });
            localStorage.setItem(AuthService.LOCAL_JWT, token);
          }
        })
      );
  }
  /**
   * signIn: call the backend signin, responding with a token
   * if email and password are valid. Then update jwtToken observable for all
   * and store it in local storage to get it with refresh or reconnection (before expired 15minutes)
   * @param credentials: the user informations necessary for sign in the app
   */
  // signIn(credentials: { email: string; password: string }): Observable<string> {
  //   return this.http
  //     .post<string>(`${environment.apiURL}/signin`, credentials)
  //     .pipe(
  //       tap((token: string) => {
  //         localStorage.setItem(AuthService.LOCAL_JWT, token);
  //         this.jwtToken.next({
  //           isAuthenticated: true,
  //           token,
  //         });
  //       })
  //     );
  // }
  /**
   * ssignUp call api backend to create a new user in database
   */
  // signUp(user: {
  //   email: string;
  //   password: string;
  // }): Observable<{ email: string; password: string }> {
  //   return this.http.post<{ email: string; password: string }>(
  //     `${environment.apiURL}/signup`,
  //     user
  //   );
  // }
  /**
   * logout clear token in local storage, and put jwtToken observable to null.
   * Navigate to connection page
   */
  logout() {
    localStorage.removeItem(AuthService.LOCAL_JWT);
    this.jwtToken.next({
      isAuthenticated: false,
      token: null,
    });
    //this.router.navigate(["connexion"]);
    window.location.reload();
  }
}
