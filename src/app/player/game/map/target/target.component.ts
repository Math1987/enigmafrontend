import { CharaService } from "./../../../../shared/services/chara.service";
import { SocketService } from "./../../../../shared/services/socket.service";
import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-target",
  templateUrl: "./target.component.html",
  styleUrls: ["./target.component.scss"],
})
export class TargetComponent implements OnInit {
  @Input("user") public user: Object = null;
  @Input("ground") public ground : Object = null ;

  constructor(
    private socketService: SocketService,
    private charaService: CharaService
  ) {}

  ngOnInit(): void {}
  attack() {
    console.log("attack");
    this.socketService.socket.emit("attack", this.user["id"], (res) => {
      console.log(res);
      if (res && res["user"]) {
        this.charaService.updateLocalChara(res["user"]);
      }
    });
  }
  isAttackable(){
    return this.charaService.character.pipe(
      map((chara) => {
        if (
          chara &&
          (!this.user["clan"] || this.user['clan'] !== chara['clan']) && 
          this.ground && this.ground['key'] !== "neutral"
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  canAttack() {
    return this.charaService.character.pipe(
      map((chara) => {
        if (
          chara &&
          chara["action"] &&
          chara["action"] > 0 &&
          this.user["life"] &&
          this.user["life"] > 0 &&
          this.user["position"]["x"] == chara["position"]["x"] &&
          this.user["position"]["y"] == chara["position"]["y"]
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
