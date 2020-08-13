import { ValuesService } from "./../../shared/services/values.service";
import { BehaviorSubject } from "rxjs";
import { CharaService } from "./../../shared/services/chara.service";
import { AuthService } from "./../../shared/services/auth.service";
import { Socket } from "socket.io";
import { SocketService } from "./../../shared/services/socket.service";
import { Drawer } from "./../../shared/models/drawer";
import { UserService } from "./../../shared/services/user.service";
import { environment } from "./../../../environments/environment";
import { MapViewverComponent } from "./../../shared/modules/map-viewver/map-viewver.component";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * Map component
 */
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit {
  IMAGES = {
    floor: new Image(),
    humanmasculin: new Image(),
    humanfeminine: new Image(),
    dwarfmasculin: new Image(),
    dwarffeminine: new Image(),
    elfmasculin: new Image(),
    elffeminine: new Image(),
    vampiremasculin: new Image(),
    vampirefeminine: new Image(),
  };
  @ViewChild("viewver") public viewver: MapViewverComponent;

  focused: BehaviorSubject<Object[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    public charaService: CharaService,
    private socketService: SocketService
  ) {
    this.IMAGES.floor.src = "assets/images/g_neutral.png";
    this.IMAGES.humanmasculin.src = "assets/images/humanmasculin.png";
    this.IMAGES.humanfeminine.src = "assets/images/humanfeminine.png";
    this.IMAGES.dwarfmasculin.src = "assets/images/dwarfmasculin.png";
    this.IMAGES.dwarffeminine.src = "assets/images/dwarffeminine.png";
    this.IMAGES.elfmasculin.src = "assets/images/elfmasculin.png";
    this.IMAGES.elffeminine.src = "assets/images/elffeminine.png";
    this.IMAGES.vampiremasculin.src = "assets/images/vampiremasculin.png";
    this.IMAGES.vampirefeminine.src = "assets/images/vampirefeminine.png";

    for (let imgKey in this.IMAGES) {
      this.IMAGES[imgKey].addEventListener("load", () => {});
    }
  }

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.socketService.socketObservable.subscribe((socket) => {
        if (socket) {
          this.charaService.character.subscribe((character) => {
            if (character && character["position"]) {
              console.log(character);
              let emptyCases = this.viewver.moveOn(
                character["position"].x,
                character["position"].y
              );
              this.askCash(emptyCases);
            }
          });

          socket.on("move", (obj, moveX, moveY) => {
            if (this.viewver.moveObject(obj)) {
              if (obj["id"] === this.userService.actualUser["id"]) {
              }
            }
          });

          socket.on("attack", (values) => {
            console.log(values);
            this.viewver.updateObjs([values["user"], values["target"]]);

            if (
              values["result"] === "kill" &&
              ((values["type"] === "attack" &&
                values["target"]["id"] ===
                  this.charaService.actualCharacter["id"]) ||
                (values["type"] === "counter" &&
                  values["user"]["id"] ===
                    this.charaService.actualCharacter["id"]))
            ) {
              alert("vous êtes mort...");
              window.location.reload();
            }
          });
        }
      });
    }, 50);

    /*this.viewver.init(0, 0);
    let emptyCases = this.viewver.move(0, 0);
    this.askCash(emptyCases);*/
  }
  askCash(emptyCases) {
    this.http
      .post(`${environment.apiUserURL}/getViews`, {
        world: this.userService.actualUser.world,
        cases: emptyCases,
      })
      .subscribe((res) => {
        try {
          const cash = res as Drawer[];
          this.viewver.addCash(cash);
        } catch (err) {}
      });
  }

  move(x: number, y: number) {
    this.socketService.socket.emit("move", x, y);
  }
  moveEvent(obj) {
    if (obj && obj["id"] === this.charaService.actualCharacter["id"]) {
      let emptyCases = this.viewver.moveOn(obj["x"], obj["y"]);
      this.askCash(emptyCases);
    }
  }
  focusCase(caseArray: Object[]) {
    this.focused.next(caseArray);
    console.log(caseArray);
  }
}
