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

  constructor(
    public accountService: AccountService,
    public charaService: CharaService,
    public socketService: SocketService
  ) {
    this.mapPops = "start";
  }

  ngOnInit() {
    this.mapPops = "start";
    setTimeout(() => {
      this.mapPops = "normal";
    }, 50);
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
            } else {
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
}
