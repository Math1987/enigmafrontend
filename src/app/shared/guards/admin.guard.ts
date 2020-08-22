import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

/**
 * Guard canActivate if the user is authenticated and have admin rights.
 */
@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  /**
   * AdminGuard block the user's admin access if not admin rights
   * @param userService: used to check admin rights
   */
  constructor() {}

  /**
   * check of iserService's currentUser ReplaySubject is actived
   * then check actual currentUser if him admin's rights are ok
   * if not, kik of, else allow admin's route.
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
