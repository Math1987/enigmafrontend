import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscription, timer} from 'rxjs';
import {Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {JwtToken} from '../models/jwt.token';

/**
 * Auth.Service work with JWT token sent from backend.
 * Manage signIn and signOut
 * It store the user's token at local value and refresh it with the timer (all 5 minutes)
 * If token is not good at refresh, send the user in connection's route
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  static LOCAL_JWT = "enigmaJDR_jwt" ;

  subscription : Subscription ;

  /**
   * the jwtToken is dynamically used with a BehaviorSubject,
   * dirrectly used in player's components to get status of connection
   * (if user is not connected, kik him of game with router)
   */
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token : null
  });

  constructor(
    private http : HttpClient,
    private router : Router
  ) {
    this.initToken();
    this.subscription = this.initTimer();
  }
  private initToken():void {
    const token = localStorage.getItem(AuthService.LOCAL_JWT);
    if ( token ){
      this.jwtToken.next({
        isAuthenticated : true,
        token : token
      });
    }else{
      this.jwtToken.next({
        isAuthenticated: false,
        token : null
      });
      this.router.navigate(['connexion']);
    }
  }
  public initTimer(){
    return timer(300000,150000).pipe(
      switchMap( ()=>{
        if ( localStorage.getItem(AuthService.LOCAL_JWT)){
          return this.http.get<string>(`${environment.backURL}/refreshToken`).pipe(
            tap((token:string) => {
              this.jwtToken.next({
                isAuthenticated: true,
                token : token
              });
              localStorage.setItem(AuthService.LOCAL_JWT, token);
            })
          );
        } else{
          this.router.navigate(['connexion']);
          return of(null);
        }
      })
    ).subscribe(() => {}, err => {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
      localStorage.removeItem(AuthService.LOCAL_JWT);
      this.subscription.unsubscribe();
    });
  }

  signIn(credentials: {email:string, password: string}): Observable<string>{
    return this.http.post<string>(`${environment.backURL}/signin`, credentials).pipe(
      tap( (token:string) => {
        console.log(token);
        this.jwtToken.next({
          isAuthenticated : true,
          token : token
        });
        localStorage.setItem(AuthService.LOCAL_JWT, token);
      }),
    );
  }
  signUp(user:{email:string, password:string}): Observable<{email:string, password:string}>{
    return this.http.post<{email:string, password:string}>(`${environment.backURL}/signup`,user) ;
  }

  logout(){
    localStorage.removeItem(AuthService.LOCAL_JWT);
    this.jwtToken.next({
      isAuthenticated : false,
      token : null
    });
    this.router.navigate(['connexion']);
  }

}
