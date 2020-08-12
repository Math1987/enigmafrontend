import { Drawer } from "./../../models/drawer";
import { MapViewverService } from "./map-viewver.service";
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { query } from "@angular/animations";

@Component({
  selector: "app-map-viewver",
  templateUrl: "./map-viewver.component.html",
  styleUrls: ["./map-viewver.component.scss"],
})
export class MapViewverComponent implements OnInit, AfterViewInit {
  constructor(private mapViewverService: MapViewverService) {}

  @Input("rayon") public rayon = 9;
  @Input("ratioY") public ratioY = 0.59;
  @Input("images") public images: {} = {};
  @Input("position") public position: { x: 0; y: 0 } = { x: 0, y: 0 };

  private matrix: {
    rounds: { x: number; y: number }[][];
    views: { x: number; y: number }[][];
  } = null;
  private cash: Drawer[] = [];

  ngOnInit(): void {
    this.matrix = this.mapViewverService.createViewMatrix(this.rayon);
  }
  ngAfterViewInit(): void {
    for (let key in this.images) {
      this.images[key].addEventListener("load", () => {});
    }

    let loadAllImages = new Promise((resolve, reject) => {
      let complete = false;
      while (!complete) {
        complete = true;
        for (let key in this.images) {
          if (!this.images[key].complete) {
            break;
          }
        }
      }
      resolve();
    })
      .then((res) => {
        setTimeout(() => {
          this.draw();
        }, 10);
      })
      .catch((err) => {});
  }
  moveObject(obj) {
    let moveDone = false;
    let foundInCash = false;
    for (let drawer of this.cash) {
      if (drawer["id"] === obj["id"]) {
        foundInCash = true;

        for (
          let r = 0;
          r < this.mapViewverService.ROUND_MATRIX[this.rayon + 1].length;
          r++
        ) {
          let concretPosition = this.mapViewverService.ROUND_MATRIX[
            this.rayon + 1
          ][r];

          if (
            obj.x === concretPosition.x + this.position.x &&
            obj.y === concretPosition.y + this.position.y
          ) {
            this.addObjInView(drawer, this.matrix.rounds[r]);
            //this.matrix.rounds[r].push(drawer);
            moveDone = true;
          }

          if (
            drawer.x === concretPosition.x + this.position.x &&
            drawer.y === concretPosition.y + this.position.y
          ) {
            for (let i = this.matrix.rounds[r].length - 1; i >= 0; i--) {
              if (this.matrix.rounds[r][i] === drawer) {
                this.matrix.rounds[r].splice(i, 1);
                moveDone = true;
              }
            }
          }
        }

        drawer.x = obj.x;
        drawer.y = obj.y;
        this.draw();
      }
    }
    if (!foundInCash) {
      console.log("obj not in cash");
      for (
        let r = 0;
        r < this.mapViewverService.ROUND_MATRIX[this.rayon + 1].length;
        r++
      ) {
        let concretPosition = this.mapViewverService.ROUND_MATRIX[
          this.rayon + 1
        ][r];

        if (
          obj.x === concretPosition.x + this.position.x &&
          obj.y === concretPosition.y + this.position.y
        ) {
          console.log("obj added in cash");
          console.log(obj);
          this.cash.push(obj);
          this.addObjInView(obj, this.matrix.rounds[r]);
          this.draw();
          moveDone = true;
        }
      }
    }
    return moveDone;
  }
  addObjInView(obj, round_container: {}[]) {
    let index = 0;
    while (
      index < round_container.length &&
      obj.z >= round_container[index]["z"]
    ) {
      index++;
    }
    round_container.splice(index, 0, obj);
  }
  move(x: number, y: number): { x: number; y: number }[] {
    this.position.x += x;
    this.position.y += y;
    let emptyCases = this.updateViewCash();
    this.draw();
    return emptyCases;
  }
  addCash(objs: Drawer[]) {
    for (let obj of objs) {
      this.cash.push(obj);
    }
    this.updateViewCash();
    this.draw();
  }
  updateViewCash() {
    let cashKeeper = [];
    let emptyCases = [];
    for (
      let r = 0;
      r < this.mapViewverService.ROUND_MATRIX[this.rayon + 1].length;
      r++
    ) {
      let rx = this.mapViewverService.ROUND_MATRIX[this.rayon + 1][r].x;
      let ry = this.mapViewverService.ROUND_MATRIX[this.rayon + 1][r].y;

      while (this.matrix.rounds[r].length > 0) {
        this.matrix.rounds[r].splice(0, 1);
      }

      for (let drawer of this.cash) {
        if (
          drawer.x === this.position.x + rx &&
          drawer.y === this.position.y + ry
        ) {
          cashKeeper.push(drawer);
          this.addObjInView(drawer, this.matrix.rounds[r]);
        }
      }
      if (this.matrix.rounds[r].length <= 0) {
        emptyCases.push({ x: this.position.x + rx, y: this.position.y + ry });
      }
    }
    for (let i = this.cash.length - 1; i >= 0; i--) {
      let destroy = true;
      for (let newCash of cashKeeper) {
        if (newCash === this.cash[i]) {
          destroy = false;
        }
      }
      if (destroy) {
        this.cash.splice(i, 1);
      }
    }
    return emptyCases;
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
          for (let vBox of vBoxes) {
            if (this.images[vBox["key"]]) {
              context.drawImage(
                this.images[vBox["key"]],
                -size / 2,
                -size / 2,
                size,
                size
              );
            }
            /*if (vBoxes === View.focused && z == 1) {
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
            }*/
          }
        } else {
        }
        context.translate(-x, -y);
      }
    }
    context.restore();
  }
}
