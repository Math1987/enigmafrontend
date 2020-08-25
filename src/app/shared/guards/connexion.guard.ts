import { map } from "rxjs/operators";
import { AccountService } from "./../services/account.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConnexionGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  /**
   * if a use try to go to connection's route,
   * check if use is already connected.
   * If yes, send him to him user's page and kik of to connection
   * else keep route to connection
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
    console.log("connection guard");
    return this.accountService.getAccount().pipe(
      map((account) => {
        console.log(account);
        if (account) {
          this.router.navigate(["u"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
