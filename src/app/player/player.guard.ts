import { AccountService } from "./../shared/services/account.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { PlayerComponent } from "./player.component";
import { CharaService } from "../shared/services/chara.service";
import { skip, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayerGuard
  implements CanActivate, CanDeactivate<PlayerComponent> {
  constructor(
    private charaService: CharaService,
    private router: Router,
    private accountService: AccountService
  ) {}

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
        if (account) {
          return true;
        } else {
          this.router.navigate(["connexion"]);
          return false;
        }
      })
    );
  }
  canDeactivate(
    component: PlayerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.charaService.destroy();
    return true;
  }
}
