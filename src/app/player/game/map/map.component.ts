import { MetaService } from "./../../../shared/services/meta.service";
import { AccountService } from "./../../../shared/services/account.service";
import { BehaviorSubject } from "rxjs";
import { CharaService } from "./../../../shared/services/chara.service";
import { SocketService } from "./../../../shared/services/socket.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pops } from "src/app/shared/animations/pops";
import { map } from "rxjs/operators";
import { WorldViewverComponent } from 'src/app/shared/modules/world-viewver/world-viewver.component';

/**
 * Map component
 */
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  animations: [pops],
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('worldViewver') worldViewver : WorldViewverComponent ;
  mapPops = "start";
  focused: BehaviorSubject<Object[]> = new BehaviorSubject([]);
  focused_ground: BehaviorSubject<Object[]> = new BehaviorSubject(null);

  constructor(
    public accountService: AccountService,
    public charaService: CharaService,
    public socketService: SocketService,
    public metadatasService: MetaService
  ) {
    this.mapPops = "start";
  }

  ngOnInit() {
    this.mapPops = "start";
    setTimeout(() => {
      this.mapPops = "normal";
    }, 50);

    this.socketService.socketObservable.subscribe((socket) => {
      if (socket) {

        socket.on("attack", (objs) => {

          if (objs["user"]["id"] === this.charaService.actualCharacter["id"]) {
            this.charaService.updateLocalChara(objs["user"]);
          } else if (
            objs["target"]["id"] === this.charaService.actualCharacter["id"]
          ) {
            this.charaService.updateLocalChara(objs["target"]);
          }
        });
        socket.on("counterAttack", (objs) => {

          if (
            objs["attacker"]["id"] === this.charaService.actualCharacter["id"]
          ) {
            this.charaService.updateLocalChara(objs["attacker"]);
          } else if (
            objs["counterAttacker"]["id"] ===
            this.charaService.actualCharacter["id"]
          ) {
            this.charaService.updateLocalChara(objs["counterAttacker"]);
          }
        });

      }
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mapPops = "normal";

      console.log('viewver component:', this.worldViewver);

    }, 50);
  }
  focus(cases: Object[]) {
    this.focused.next(cases);
  }
  getFocused() {
    return this.focused.pipe(
      map((cases) => {
        if (Array.isArray(cases)) {
          let newFocused = [];
          for (let obj of cases) {
            if (
              obj["id"] &&
              obj["id"] === this.charaService.actualCharacter["id"]
            ) {
            } else if (
              this.metadatasService.getTypeOf(obj["key"]) !== "ground"
            ) {
              newFocused.push(obj);
            }
          }
          return newFocused;
        } else {
          return [];
        }
      })
    );
  }
  getImg(target) {
    return `assets/images/${target["key"]}_illu.png`;
  }

  moveRequest( values :  { x : number, y : number}){

    if (
      this.socketService.socket &&
      this.charaService.character.getValue() &&
      this.charaService.character.getValue()["move"] &&
      this.charaService.character.getValue()["move"] > 0
    ) {
      this.socketService.socket.emit("move", values.x, values.y, (moverRes) => {
        if (moverRes && moverRes["chara"]) {
          this.charaService.updateLocalChara(moverRes["chara"]);
          // let newChara = this.character.getValue();
          // newChara["position"]["x"] += x;
          // newChara["position"]["y"] += y;
          //this.character.next(newChara);
          //this.worldService.moveView(x, y);
        }
      });
    }

  }

  getFocusedGround() {
    return this.focused.pipe(
      map((cases) => {
        if (Array.isArray(cases) && cases.length > 0) {
          let target = {};
          for (let obj of cases) {
            if (this.metadatasService.getTypeOf(obj["key"]) === "ground") {
              Object.assign(
                target,
                this.metadatasService.getObj(obj["key"]),
                obj
              );
              target["name"] = target["name_fr"];
            }
          }

          return target;
        } else {
          return {};
        }
      })
    );
  }
}
