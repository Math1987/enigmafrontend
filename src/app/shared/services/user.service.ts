import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {UserModel} from '../models/user.model';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

/**
 * UserService send currentUser, containing datas as email, name etc...
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * CurrentUser contain the user interface as ReplaySubject,
   * sharing the user datas to all the player's components,
   * after creation of it with no value.
   * actual user is the value saved from subscription of currentUser
   */
  public currentUser: ReplaySubject<UserModel> = new ReplaySubject<UserModel>(undefined);
  public actualUser : UserModel = null ;
  /**
   * CurentUser is called as one instance from the main app component
   * @param http: used to get datas from backend
   * @param authService: used to observe authenticated status to update when token change
   */
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    /**
     * Reset the currentUser if a new jwtToken is observed in AuthService
     */
    this.authService.jwtToken.subscribe((res) => {
      if ( res && localStorage.getItem(AuthService.LOCAL_JWT) ) {
        this.http.get<UserModel>(`${environment.backURL}/user`).subscribe(
          (user) => {
              if (user) {
                this.actualUser = user ;
                this.currentUser.next(user);
              } else {
                this.actualUser = null ;
                this.currentUser.next(null);
              }
        }, (error => {
          authService.logout();
          console.log(error);
          }));
      }else{
        this.actualUser = null ;
        this.currentUser.next(null);
      }

    });
  }

  /**
   * give the currentUser ReplaySubject that's all.
   */
  public getCurrentUserObservable(): ReplaySubject<UserModel> {
    /*if ( this.currentUser.value) {
      return this.currentUser ;
    } else {
      return this.http.get<UserModel>(`${environment.backURL}/user`).pipe(
        tap( (user: UserModel) => {
          this.currentUser.next(user);
        }),
        switchMap(() => {
          return this.currentUser;
        })
      );
    }*/
    return this.currentUser ;
  }

  /**
   * give the actualUser value
   */
  public getCurrentUser(){
    return this.actualUser ;
  }

  /**
   * set the replaySubject value and actualUser as null.
   * All the conerned components, services etc...will kwnow
   * what to do ;).
   */
  public logout(){
    this.actualUser = null ;
    this.currentUser.next(null);
  }

}
