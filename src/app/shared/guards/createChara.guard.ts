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
import { CharaService } from "../services/chara.service";
import { map, skip } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CreateCharaGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  /**
   * check if the user got a character registed and actived.
   * use characterService's ReplaySubject character
   * with a pipe operator to transform value to boolean
   * if fot one, kik out of creation character
   * else allow route.
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
      map((res) => {
        console.log("guard chara", res);
        if (res && res["chara"]) {
          this.router.navigate(["u/map"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
