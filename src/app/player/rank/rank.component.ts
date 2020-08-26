import { RankService } from "./../../shared/services/rank.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-rank",
  templateUrl: "./rank.component.html",
  styleUrls: ["./rank.component.scss"],
})
export class RankComponent implements OnInit {
  public displayedColumns: string[] = ["name", "kills"];
  public dataSource: MatTableDataSource<Object> = new MatTableDataSource();

  constructor(public rankService: RankService) {}

  ngOnInit(): void {

    this.rankService.getKills().subscribe( kills =>{

      this.dataSource.data = kills ;

    })

  }
}
