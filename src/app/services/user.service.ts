import { Injectable } from '@angular/core';
import {BackService} from './back.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  session : BehaviorSubject<Object> = null ;

  constructor(
    private http : HttpClient,
    private router : Router
  ) {

    this.session = new BehaviorSubject<Object>(null);
    this.session.subscribe( con =>{
      console.log(con);
    });
    if ( localStorage.getItem("enigmaJDR") ){
      this.login('test@test.com', "test", function(res) {});
    }else{
      this.router.navigate(['login']);
    }

  }

  login(email, password, callBack){
    const self = this ;
    this.http.get(`${environment.backURL}/readAccount?email=${email}&password=${password}`).subscribe((res)=>{
      if ( res ){
        callBack(true);
        self.session.next(res);
      }else{
        callBack(false);
        self.router.navigate(['login']);
      }
    });
  }


}
