import { ReversePipe } from "./../../pipes/reverse.pipe";
import { CharaService } from "./../../services/chara.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-historic",
  templateUrl: "./historic.component.html",
  styleUrls: ["./historic.component.scss"],
})
export class HistoricComponent implements OnInit {
  constructor(public charaService: CharaService) {}

  ngOnInit(): void {}
}
