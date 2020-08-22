import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  account: BehaviorSubject<Object> = new BehaviorSubject<Object>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    console.log("build account");
    if (this.tokenService.getToken()) {
      console.log(this.tokenService.getToken());
      this.readAccount(this.tokenService.getToken()).subscribe((accountRes) => {
        console.log("acount:", accountRes);
        if (accountRes) {
          this.account.next(accountRes);
        } else {
          this.account.next(null);
        }
      });
    }
  }

  init() {}
  destroy() {}

  public checkEmail(email: string) {
    console.log(email);
    return this.http.get(
      `${environment.apiURL}/account/checkEmail?email=${email}`
    );
  }
  public checkName(name: string) {
    console.log(name);
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
          console.log(accountRes);
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

  setChara(chara: Object) {
    let account = this.account.getValue();
    let newObj = {};
    Object.assign(newObj, account);
    newObj["chara"] = chara;
    this.account.next(newObj);
  }
}
