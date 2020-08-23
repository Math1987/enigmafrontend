import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
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
