import { AccountService } from "./../services/account.service";
import { logging } from "protractor";
import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
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
export class ConfirmGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private http: HttpClient
  ) {}

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
    this.http
      .post(`${environment.apiURL}/account/confirm`, {
        code: Object.keys(route.queryParams)[0],
      })
      .subscribe((confirmRes) => {
        if (confirmRes && confirmRes["email"] && confirmRes["password"]) {
          this.accountService
            .signIn({
              email: confirmRes["email"],
              password: confirmRes["password"],
            })
            .subscribe((signin) => {
              if (signin) {
                this.router.navigate(["/u/bienvenue"]);
                alert(
                  "merci pour votre inscription! \n Nous allons vous rediriger vers votre compte."
                );
              }
            });
        }
      });
    return true;
  }
}
