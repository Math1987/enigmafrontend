import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {environment} from '../../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';

/**
 * UserService send currentUser, containing datas as email, name etc...
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null)

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<UserModel> {
    if ( this.currentUser.value){
      return this.currentUser ;
    }else{
      return this.http.get<UserModel>(`${environment.backURL}/user`).pipe(
        tap( (user : UserModel) =>{
          this.currentUser.next(user);
        }),
        switchMap(() => {
          return this.currentUser;
        })
      );
    }
  }

}
