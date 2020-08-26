import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-view-player",
  templateUrl: "./view-player.component.html",
  styleUrls: ["./view-player.component.scss"],
})
export class ViewPlayerComponent implements OnInit {
  @Input("target") public target: Object = null;

  constructor() {}

  ngOnInit(): void {}

  getImg() {
    return `assets/images/${this.target["key"]}_illu.png`;
  }
  getLife() {
    return `${this.target["life"]}/${this.target["life_max"]}`;
  }
}
