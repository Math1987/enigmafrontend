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
import { UserService } from "../shared/services/user.service";
import { CharaService } from "../shared/services/chara.service";
import { skip } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayerGuard
  implements CanActivate, CanDeactivate<PlayerComponent> {
  constructor(
    private userService: UserService,
    private charaService: CharaService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("player guard start");
    this.userService.init();
    this.charaService.init();

    this.charaService.character.pipe().subscribe((res) => {
      console.log("player guard chara pipe");
      if (!res && !state.url.includes("bienvenue")) {
        //this.router.navigate(["/u/bienvenue"]);
      }
    });

    return true;
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
    this.userService.destroy();
    this.charaService.destroy();
    return true;
  }
}
