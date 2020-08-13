import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ValuesService } from "./../../../shared/services/values.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
})
export class ActionComponent implements OnInit {
  @Input("user") public user: Object = null;
  @Input("target") public target: Object = null;

  constructor(private http: HttpClient, public valueService: ValuesService) {}

  ngOnInit(): void {}

  canAttack() {
    if (
      this.user &&
      this.user["actions"] &&
      this.target &&
      this.user["id"] !== this.target["id"] &&
      this.target["life"]
    ) {
      return true;
    } else {
      return false;
    }
  }
  attack() {
    this.http
      .post(`${environment.apiUserCharaURL}/attack`, { target: this.target })
      .subscribe((resAttack) => {
        console.log("attack res");
      });
  }
}
