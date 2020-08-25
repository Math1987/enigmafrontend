import { environment } from "./../../../environments/environment";
import { AccountService } from "./account.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RankService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((account) => {
      if (account) {
        this.http
          .get(
            `${environment.backURL}/api/rank/kills?world=${account["world"]}&id=${account["id"]}`
          )
          .subscribe((killsRes) => {});
      }
    });
  }
}
