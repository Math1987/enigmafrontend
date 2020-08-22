import { CharaService } from "./../../shared/services/chara.service";
import { Component, OnInit } from "@angular/core";
import { MetaService } from "../../shared/services/meta.service";
import { pops } from "../../shared/animations/pops";

@Component({
  selector: "app-player-container",
  templateUrl: "./player-toolbar.component.html",
  styleUrls: ["./player-toolbar.component.scss"],
  animations: [pops],
})
export class PlayerToolbarComponent implements OnInit {
  popsAnimator = "start";

  constructor(
    public charaService: CharaService,
    public metadatas: MetaService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.popsAnimator = "normal";
    }, 750);
  }
}
