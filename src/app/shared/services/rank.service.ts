import { environment } from "./../../../environments/environment";
import { AccountService } from "./account.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RankService {
  kills: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>(null);

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.getAccount().subscribe((account) => {
      if (account) {
        this.http
          .get(
            `${environment.apiURL}/rank/kills?world=${account["world"]}&id=${account["id"]}`
          )
          .subscribe((killsRes) => {
            if (Array.isArray(killsRes)) {
              this.kills.next(killsRes);
            }
          });
      }
    });
  }
  getKills() {
    return this.kills;
  }
}
