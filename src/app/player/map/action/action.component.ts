import { CharaService } from "./../../../shared/services/chara.service";
import { SocketService } from "./../../../shared/services/socket.service";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
})
export class ActionComponent implements OnInit {
  @Input("user") public user: Object = null;
  @Input("target") public target: Object = null;

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private charaService: CharaService
  ) {}

  ngOnInit(): void {}

  canAttack() {
    if (
      this.user &&
      this.user["action"] &&
      this.user["action"] > 0 &&
      this.target &&
      this.user["id"] !== this.target["id"] &&
      this.target["life"] &&
      this.target["life"] > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  attack() {
    this.socketService.socket.emit("attack", this.target["id"], (res) => {
      if (res && res["user"]) {
        this.charaService.updateLocalChara(res["user"]);
      }
    });
  }
}
