import { AccountService } from "./../services/account.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
  constructor(private accountService: AccountService, private router: Router) {}

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
    return this.accountService.getAccount().pipe(
      map((account) => {
        console.log(account);
        if (account && account["admin"]) {
          return false;
        } else {
          this.router.navigate(["u"]);
          return false;
        }
      })
    );
  }
}
