import { AccountService } from "./../../shared/services/account.service";
import { BehaviorSubject } from "rxjs";
import { CharaService } from "./../../shared/services/chara.service";
import { SocketService } from "./../../shared/services/socket.service";
import { Drawer } from "./../../shared/models/drawer";
import { environment } from "./../../../environments/environment";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pops } from "src/app/shared/animations/pops";

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
}
