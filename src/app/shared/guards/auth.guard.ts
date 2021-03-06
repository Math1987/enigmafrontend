import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
/**
 * Guard canActivate if the user is authenticated or not.
 * (used in player acces, to block all game's routes if user note authenticated)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * AuthGuard block the player's routes access if not authenticated
   * @param authService: used to check token and allow route if valid
   */
  constructor(
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return this.authService.jwtToken.getValue().isAuthenticated;
  }

}
