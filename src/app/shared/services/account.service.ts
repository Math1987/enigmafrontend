import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { tap, map, first } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private actualChara = null;
  private account: ReplaySubject<Object> = new ReplaySubject<Object>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    console.log("build accountService");
    this.account.subscribe((account) => {
      this.actualChara = account;
    });

    if (this.tokenService.getToken()) {
      this.readAccount(this.tokenService.getToken()).subscribe((accountRes) => {
        console.log(accountRes);
        if (accountRes) {
          this.account.next(accountRes);
        } else {
          this.account.next(null);
        }
      });
    } else {
      this.account.next(null);
    }
  }

  init() {}
  destroy() {}

  public checkEmail(email: string) {
    return this.http.get(
      `${environment.apiURL}/account/checkEmail?email=${email}`
    );
  }
  public checkName(name: string) {
    return this.http.get(
      `${environment.apiURL}/account/checkName?name=${name}`
    );
  }
  signUp(user: {
    email: string;
    password: string;
  }): Observable<{ email: string; password: string }> {
    return this.http.post<{ email: string; password: string }>(
      `${environment.apiURL}/account/signup`,
      user
    );
  }
  signIn(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<string>(`${environment.apiURL}/account/signin`, credentials)
      .pipe(
        tap((accountRes: string) => {
          if (accountRes && accountRes["token"] && accountRes) {
            this.tokenService.setToken(accountRes["token"]);
            this.account.next(accountRes);

            this.router.navigate(["/u"]);
          }
        })
      );
  }
  readAccount(token: string) {
    return this.http.post(`${environment.apiURL}/account/readAccount`, {
      token: token,
    });
  }

  getAccount() {
    return this.account; // this.account.pipe(first((x) => x > 0));
  }

  setChara(chara: Object) {
    let account = this.actualChara;
    let newObj = {};
    Object.assign(newObj, account);
    newObj["chara"] = chara;
    this.account.next(newObj);
  }

  logOut() {
    this.account.next(null);
    this.tokenService.removeToken();
    this.router.navigate(["connexion"]);
    window.location.reload();
  }
}
