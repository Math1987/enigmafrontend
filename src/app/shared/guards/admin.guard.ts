import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
/**
 * Guard canActivate if the user is authenticated and have admin rights.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  /**
   * AdminGuard block the user's admin access if not admin rights
   * @param userService: used to check admin rights
   */
  constructor(
    private userService : UserService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    if ( this.userService.currentUser && this.userService.currentUser.getValue() && this.userService.currentUser.getValue().admin ){
      return true;
    }else{
      return false ;
    }
  }

}
