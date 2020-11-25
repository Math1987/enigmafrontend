import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  admin : ReplaySubject<Object> = new ReplaySubject();
  actualAdmin : Object = null ;

  constructor(
    private http: HttpClient,
    private tokenService : TokenService,
    private router : Router
  ) { 

    this.admin.subscribe( admin=>{
      this.actualAdmin = admin ;
    });

    console.log('look for admin token', this.tokenService.getToken());
    if ( this.tokenService.getToken() ){
      this.http.post(`${environment.apiURL}/admin/readToken`, {token : this.tokenService.getToken()}).subscribe( adminRes => {
        console.log('adminRes', adminRes);
        this.admin.next(adminRes);
      }); 
    }else{
      this.admin.next(null);
    }

  }

  login(user, password, callback){
    this.http.post(`${environment.apiURL}/admin/login`, { user : user, password: password}).subscribe( resLogin => {
      console.log(resLogin);
      if ( resLogin && resLogin['token']){
        this.tokenService.setToken(resLogin['token']);
        this.router.navigate(['/admin/main']);
        document.location.reload();
        callback(true);
      }else{
        callback(false);
      }

    }, err => {
      console.log(err);
      callback(false);
    })
  }
  logOut(){
    this.tokenService.removeToken();
    localStorage.removeItem('token');
    this.admin.next(null);
    this.router.navigate(['/admin/login']);
    document.location.reload();
  }
  getAdmin(){
    return this.admin ;
  }
  getWorlds(){
    let subscription = this.http.get(`${environment.apiURL}/admin/getWorlds`) ;
    return subscription ;
  }


  updateWorldValue(worldName, obj, key, value, callback){
    console.log('update world value', value);
    this.http.post(`${environment.apiURL}/admin/updateWorldValue`, {
      worldName : worldName,
      target : obj,
      key : key,
      value : value
    }).subscribe( res => {
      console.log(res);
      callback(true);
    }, err => {
      console.log('err', err);
    })
  }

}
