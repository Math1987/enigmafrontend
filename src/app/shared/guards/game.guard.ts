import { map } from "rxjs/operators";
import { AccountService } from "../services/account.service";
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
export class GameGuard implements CanActivate {
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
    return this.accountService.getAccount().pipe(
      map((account) => {
        if (account && account["chara"]) {
          return true;
        } else {
          this.router.navigate(["u/bienvenue"]);
          return false;
        }
      })
    );
  }
}
