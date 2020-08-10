import { MapViewverService } from "./map-viewver.service";
import { Component, OnInit, Input } from "@angular/core";
import { query } from "@angular/animations";

@Component({
  selector: "app-map-viewver",
  templateUrl: "./map-viewver.component.html",
  styleUrls: ["./map-viewver.component.scss"],
})
export class MapViewverComponent implements OnInit {
  constructor(private mapViewverService: MapViewverService) {}

  @Input("rayon") public rayon = 9;
  @Input("ratioY") public ratioY = 0.59;

  floor = new Image();

  private matrix: {
    rounds: { x: number; y: number }[][];
    views: { x: number; y: number }[][];
  } = null;
  private cash = [];

  ngOnInit(): void {
    this.floor.src = "assets/images/g_neutral.png";
    this.floor.addEventListener("load", (res) => {
      this.draw();
    });

    this.matrix = this.mapViewverService.createViewMatrix(this.rayon);
    this.draw();
  }

  draw() {
    const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
    const context = canvas1.getContext("2d");

    const width = canvas1.width;
    const height = canvas1.height;
    const size = Math.min(
      width / this.rayon / 2,
      height / this.rayon / 2 / this.ratioY
    );

    context.clearRect(0, 0, canvas1.width, canvas1.height);

    context.save();
    context.translate(width / 2, height / 2 - size / 4);

    for (let z = 0; z < 3; z++) {
      for (
        let i = 0;
        i < this.mapViewverService.VIEW_MATRIX[this.rayon].length;
        i++
      ) {
        let round = this.mapViewverService.VIEW_MATRIX[this.rayon][i];
        let vBoxes = this.matrix.views[i];

        let x = (round.x * size) / 2 + round.y * size * 0.5;
        let y =
          (round.y * size * this.ratioY) / 2 -
          (round.x * size * this.ratioY) / 2;
        context.translate(x, y);

        if (vBoxes !== null) {
          /*for (let vBox of vBoxes) {
            if (vBoxes === View.focused && z == 1) {
              context.beginPath();
              context.moveTo(size / 2, size * 0.25 * View.RATIOY);
              context.lineTo(0, -size * 0.25 * View.RATIOY);
              context.lineTo(-size / 2, size * 0.25 * View.RATIOY);
              context.lineTo(0, size * 0.75 * View.RATIOY);
              context.lineTo(size / 2, size * 0.25 * View.RATIOY);
              context.strokeStyle = "black";
              context.stroke();
            }

            if (vBox !== null && vBox.getZ() == z) {
              vBox.draw(context, size);
            }
          }*/
          context.drawImage(this.floor, -size / 2, -size / 2, size, size);
        } else {
        }
        context.translate(-x, -y);
      }
    }
    context.restore();
  }
}
