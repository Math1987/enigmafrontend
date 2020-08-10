import { MapViewverComponent } from './../../shared/modules/map-viewver/map-viewver.component';
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
  };
  @ViewChild('viewver') public viewver : MapViewverComponent ;

  constructor(private http: HttpClient) {
    this.IMAGES.floor.src = "assets/images/g_neutral.png";
    this.IMAGES.floor.addEventListener("load", () => {});
  }

  ngOnInit() {
    


  }
  ngAfterViewInit(){
    let emptyCases = this.viewver.move(0,0);
    let start = [];
    for ( let emptyCoords of emptyCases ){
      start.push({x : emptyCoords.x, y : emptyCoords.y, key : "floor", z : 0});
    }
    this.viewver.addCash(start);
  }

  move(x:number, y:number){
    this.viewver.move(x,y);
  }
}
