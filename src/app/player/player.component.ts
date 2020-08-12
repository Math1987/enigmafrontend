import { SocketService } from "./../shared/services/socket.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { JwtToken } from "../shared/models/jwt.token";
import {
  BehaviorSubject,
  interval,
  Observable,
  ReplaySubject,
  Subscription,
} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../shared/models/user.model";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { skip, tap, withLatestFrom } from "rxjs/operators";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { UserService } from "../shared/services/user.service";
import { CharaService } from "../shared/services/chara.service";
import { Chara } from "../shared/models/chara.model";
import { MetaService } from "../shared/services/meta.service";
import { AnimationService } from "../shared/services/animation.service";
import { pops } from "../shared/animations/pops";

/**
 * Main player's component (calling "u" in routes)
 * Contain the nav-bar menu for player
 * send with router-outlet to focused component (map, character etc...)
 * When build, check token status and kik out if not valid
 */
@Component({
  selector: "app-game",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
  animations: [
    pops,
    trigger("intro", [
      state(
        "start",
        style({
          opacity: 0.0,
          transform: "translate(0px,-100px)",
        })
      ),
      state(
        "normal",
        style({
          opacity: 1.0,
          transform: "translate(0px,0px)",
        })
      ),
      transition("* => normal", animate(`500ms 0ms ease-out`)),
    ]),
  ],
})
export class PlayerComponent implements OnInit, OnDestroy {
  /**
   * @jwtToken is the token observed in AuthService
   * @subscription used to avoid memory leak
   * @currentUser is the Observable of User, used as pipe in template
   * to show or not user's routes
   * @currentChara is the Observable of Chara, used to give
   * a route as "bienvenue" for creation of user's chara if null
   */
  public jwtToken: JwtToken;
  public subscription: Subscription;
  public containerAnimation: string = "start";

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    public charaService: CharaService,
    private metaService: MetaService,
    private animationService: AnimationService,
    private socketService: SocketService
  ) {
    this.animationService.background_state.next("normal");
  }

  ngOnInit(): void {
    this.subscription = this.authService.jwtToken.subscribe((jwtToken) => {
      this.jwtToken = jwtToken;
    });
  }
  public startContent(event) {
    this.containerAnimation = "normal";
  }

  /**
   * deconnection, logout AuthService, UserService,
   * then send to connection's route to kik out
   * in the appropriate place.
   */
  public deconnection(): void {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate(["connexion"]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
