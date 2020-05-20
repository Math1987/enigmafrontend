import { Injectable } from '@angular/core';
import {BackService} from './back.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';




interface Session{
  email : string,
  password : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  static SESSION_LOCAL_NAME = "enigmaJDR" ;

  session : BehaviorSubject<Object> = null ;

  constructor(
    private http : HttpClient,
    private router : Router
  ) {

    const self = this ;

    this.session = new BehaviorSubject<Session>(null);
    if ( localStorage.getItem("enigmaJDR") ){
      this.login('test@test.com', "test", function(res) {
      });
    }

    this.session.subscribe(state =>{
      if ( state ){
        this.router.navigate(['u','map']);
        console.log('session created');
      }
    })

  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const self = this ;
    console.log(route.url);con
    return this.session.pipe(
      map( (user : Session) =>{
        console.log('map can activate ' + user );
        if ( user  ){
          self.router.navigate(route.url);
          return true ;
        }else{
          return false ;
        }
      })
    );
  }*/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const self = this ;
    this.session.subscribe(session =>{
      /*console.log(session);
      console.log(route.url);
      console.log(self.router.url);*/
      if ( session ){
        //console.log([`${route.url[0].path}`]);
        //self.router.navigate(["u"]);
      }
    });
    if ( this.session.getValue() ){
      return true ;
    }else{
      this.router.navigate(['login']);
      return false ;
    }
  }

  login(email, password, callBack){
    const self = this ;
    this.http.get(`${environment.backURL}/readAccount?email=${email}&password=${password}`).subscribe((res)=>{
      if ( res ){
        self.openSession(res);
        callBack(true);
      }else{
        callBack(false);
        self.router.navigate(['login']);
      }
    });
  }
  logout(){
    localStorage.removeItem(UserService.SESSION_LOCAL_NAME);
    this.session.next(null);
    this.router.navigate(['login']);
  }
  openSession(session){
    this.session.next(session);
    console.log(session);
    localStorage.setItem(UserService.SESSION_LOCAL_NAME, JSON.stringify(session));
  }

}
