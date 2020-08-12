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
    elf: new Image(),
  };
  @ViewChild("viewver") public viewver: MapViewverComponent;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private charaService: CharaService,
    private socketService: SocketService
  ) {
    this.IMAGES.floor.src = "assets/images/g_neutral.png";
    this.IMAGES.elf.src = "assets/images/elf_man.png";

    this.IMAGES.floor.addEventListener("load", () => {});
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.socketService.socketObservable.subscribe((socket) => {
      if (socket) {
        let subscription = this.charaService.character.subscribe(
          (character) => {
            if (character && character["position"]) {
              let emptyCases = this.viewver.move(
                character["position"].x,
                character["position"].y
              );
              this.askCash(emptyCases);
              subscription.unsubscribe();
            }
          }
        );

        socket.on("move", (obj, moveX, moveY) => {
          if (this.viewver.moveObject(obj)) {
            console.log("move");
            if (obj["id"] === this.userService.actualUser["id"]) {
              let emptyCases = this.viewver.move(moveX, moveY);
              this.askCash(emptyCases);
            }
          }
        });
      }
    });

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

    // this.http
    //   .post(`${environment.apiUserCharaURL}/move`, { x: x, y: y })
    //   .subscribe((moveRes) => {});

    //let emptyCases = this.viewver.move(x, y);
    //this.askCash(emptyCases);
  }
}
