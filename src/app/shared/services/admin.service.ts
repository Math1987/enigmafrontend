import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private tokenService : TokenService
  ) { }

  login(user, password, callback){
    this.http.post(`${environment.apiURL}/admin/login`, { user : user, password: password}).subscribe( resLogin => {
      console.log(resLogin);
      if ( resLogin && resLogin['token']){
        this.tokenService.setToken(resLogin['token']);
        callback(true);
      }else{
        callback(false);
      }

    }, err => {
      console.log(err);
      callback(false);
    })
  }
  getWorlds(){
    let subscription = this.http.get(`${environment.apiURL}/admin/getWorlds`) ;
    return subscription ;
  }

}
