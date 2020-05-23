import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {JwtToken} from '../models/jwt.token';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  static LOCAL_JWT = "enigmaJDR_jwt" ;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token : null
  });

  constructor(
    private http : HttpClient,
    private router : Router
  ) {
    this.initToken();
  }
  private initToken():void {
    const token = localStorage.getItem(UserService.LOCAL_JWT);
    if ( token ){
      this.jwtToken.next({
        isAuthenticated : true,
        token : token
      });
      this.router.navigate(['u','map']);
    }else{
      this.jwtToken.next({
        isAuthenticated: false,
        token : null
      });
      this.router.navigate(['login']);
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.jwtToken.getValue().isAuthenticated ;
  }

  signIn(credentials: {email:string, password: string}): Observable<string>{
    // @ts-ignore
    return this.http.post<string>(`${environment.backURL}/signin`, credentials, {responseType: 'text'} ).pipe(
      tap( (token:string) => {
        this.jwtToken.next({
          isAuthenticated : true,
          token : token
        });
        localStorage.setItem(UserService.LOCAL_JWT, token);
      }),
    );
  }
  signUp(user:{email:string, password:string}): Observable<{email:string, password:string}>{
    return this.http.post<{email:string, password:string}>(`${environment.backURL}/signup`,user) ;
  }

  logout(){
    localStorage.removeItem(UserService.LOCAL_JWT);
    this.jwtToken.next({
      isAuthenticated : false,
      token : null
    });
    this.router.navigate(['login']);
  }

}
