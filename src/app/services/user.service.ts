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

  session : BehaviorSubject = null ;

  constructor(
    private http : HttpClient,
    private router : Router
  ) {

    this.session = new BehaviorSubject<any>(null);
    this.session.subscribe( con =>{
      console.log(con);
    });
    if ( localStorage.getItem("enigmaJDR") ){
      this.login('test@test.com', "test");
    }else{
      this.router.navigate(['login']);
    }

  }

  login(email, password){
    const self = this ;
    this.http.get(`${environment.backURL}/readAccount?email=${email}&password=${password}`).subscribe((res)=>{
      if ( res ){
        self.session.next(res);
      }else{
        self.router.navigate(['login']);
      }
    });
  }


}
