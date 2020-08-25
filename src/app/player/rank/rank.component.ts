import { RankService } from "./../../shared/services/rank.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rank",
  templateUrl: "./rank.component.html",
  styleUrls: ["./rank.component.scss"],
})
export class RankComponent implements OnInit {
  constructor(public rankService: RankService) {}

  ngOnInit(): void {}
}
