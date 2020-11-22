import { MetaService } from "./../../../shared/services/meta.service";
import { AccountService } from "./../../../shared/services/account.service";
import { BehaviorSubject } from "rxjs";
import { CharaService } from "./../../../shared/services/chara.service";
import { SocketService } from "./../../../shared/services/socket.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pops } from "src/app/shared/animations/pops";
import { map } from "rxjs/operators";

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

  getClan(){
    let clan = '' ;
    return this.metadatasService.get()['clan']['darkclan']['name_fr'] ;// this.charaService.actualCharacter['clan'];
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
