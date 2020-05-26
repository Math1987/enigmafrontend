import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {environment} from '../../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

/**
 * UserService send currentUser, containing datas as email, name etc...
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * CurrentUser contain the user interface as BehaviorSubject,
   * sharing the user datas to all the player's components.
   */
  public currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
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
      this.currentUser.next(null);
    });
  }

  /**
   * getCurrentUser return the behaviorSubject currentUser.
   * If it value exist, sending it, else, check the backend to get it,
   * (the protected datas will check token in header used with interceptor)
   */
  public getCurrentUser(): Observable<UserModel> {
    if ( this.currentUser.value) {
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
    }
  }

}
