import { BehaviorSubject } from "rxjs";
import { Socket } from "socket.io";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { newArray } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root",
})
export class WorldViewverService {
  
  images = {
    desert: new Image(),
    humanmasculin: new Image(),
    humanfeminine: new Image(),
    dwarfmasculin: new Image(),
    dwarffeminine: new Image(),
    elfmasculin: new Image(),
    elffeminine: new Image(),
    vampiremasculin: new Image(),
    vampirefeminine: new Image(),
  };
  zOrder = {
    desert: 0,
    humanmasculin: 2,
    humanfeminine: 2,
    dwarfmasculin: 2,
    dwarffeminine: 2,
    elfmasculin: 2,
    elffeminine: 2,
    vampiremasculin: 2,
    vampirefeminine: 2,
  };

  ROUND_MATRIX = null;
  VIEW_MATRIX = null;
  ROUNDS = null;
  ratioY = 0.59;

  rayon: number = 4;
  x: number = 0;
  y: number = 0;
  roundMatrix: Object[][] = [];
  viewMatrix: Object[][] = [];

  public posBehavior: BehaviorSubject<{
    x: number;
    y: number;
  }> = new BehaviorSubject({
    x: 0,
    y: 0,
  });
  public focused: BehaviorSubject<Object[]> = new BehaviorSubject(null);
  chara: BehaviorSubject<Object> = null;
  socket: Socket = null;
  canvas: HTMLCanvasElement = null;

  constructor() {
    for (let key in this.images) {
      this.images[key].src = `/assets/images/${key}.png`;
    }

    this.ROUND_MATRIX = [];
    this.VIEW_MATRIX = [];

    const RAYON = 20;

    const SQUARE_RAYONS = [];

    for (let r = 0; r < RAYON; r++) {
      const SQUARE_RAYON = [];
      for (let x = -r; x <= r; x++) {
        let y = -r;
        SQUARE_RAYON.push({ x: x, y: y });
      }
      for (let y = -r + 1; y <= r; y++) {
        let x = r;
        SQUARE_RAYON.push({ x: x, y: y });
      }
      for (let x = r - 1; x >= -r; x--) {
        let y = r;
        SQUARE_RAYON.push({ x: x, y: y });
      }
      for (let y = r - 1; y > -r; y--) {
        let x = -r;
        SQUARE_RAYON.push({ x: x, y: y });
      }
      SQUARE_RAYONS.push(SQUARE_RAYON);
    }
    this.ROUND_MATRIX = [];

    for (let r = 0; r < RAYON; r++) {
      let fullRounds = [];
      for (let rayon = 0; rayon < r; rayon++) {
        for (let round of SQUARE_RAYONS[rayon]) {
          fullRounds.push(round);
        }
      }
      this.ROUND_MATRIX.push(fullRounds);
    }

    this.VIEW_MATRIX = [];

    for (let r = 0; r < RAYON; r++) {
      let rounds = [];
      for (let clone of this.ROUND_MATRIX[r]) {
        rounds.push(clone);
      }
      let view = [];
      while (rounds.length > 0) {
        let max = -100000;
        let focus = 0;
        for (let i = 0; i < rounds.length; i++) {
          if ((-rounds[i].x + r) * -(rounds[i].y + r) > max) {
            max = (-rounds[i].x + r) * -(rounds[i].y + r);
            focus = i;
          }
        }
        view.push({
          x: rounds[focus].x,
          y: rounds[focus].y,
        });
        rounds.splice(focus, 1);
      }
      this.VIEW_MATRIX.push(view);
    }
  }

  init(
    chara: BehaviorSubject<Object>,
    socket: Socket,
    canvas: HTMLCanvasElement
  ) {
    this.chara = chara;
    this.socket = socket;
    this.canvas = canvas;
    if (this.chara) {
      this.chara.subscribe((newChara) => {
        console.log("world view", newChara);
        if (newChara && newChara["position"]) {
          this.x = newChara["position"]["x"];
          this.y = newChara["position"]["y"];
          this.posBehavior.next({ x: this.x, y: this.y });
          this.createViewMatrix(4);
          this.initRounds();
        }
      });
    }
    this.socket.on("move", (obj, callback) => {
      this.moveObj(obj);
    });

    this.canvas.addEventListener("mousedown", (event) => {
      this.mouseDown(event);
    });
  }

  createViewMatrix(
    rayon: number
  ): {
    rounds: { x: number; y: number }[][];
    views: { x: number; y: number }[][];
  } {
    let roundMatrix: { x: number; y: number }[][] = [];
    let viewMatrix: { x: number; y: number }[][] = [];

    //create a round matrix for all the rayon + 1
    for (let rounds of this.ROUND_MATRIX[rayon + 1]) {
      roundMatrix.push([]);
    }

    //just set a empty place to store the deep-memory array in rounds
    for (let view of this.VIEW_MATRIX[rayon]) {
      viewMatrix.push(null);
    }

    for (let r = 0; r < this.ROUND_MATRIX[rayon + 1].length; r++) {
      let round = this.ROUND_MATRIX[rayon + 1][r];
      for (let v = 0; v < this.VIEW_MATRIX[rayon].length; v++) {
        let view = this.VIEW_MATRIX[rayon][v];
        if (round.x == view.x && round.y == view.y) {
          viewMatrix[v] = roundMatrix[r];
          break;
        }
      }
    }

    this.rayon = rayon;
    this.roundMatrix = roundMatrix;
    this.viewMatrix = viewMatrix;
    return {
      rounds: roundMatrix,
      views: viewMatrix,
    };
  }
  initRounds() {
    let positions = [];

    for (let r = 0; r < this.ROUND_MATRIX[this.rayon + 1].length; r++) {
      let round = this.ROUND_MATRIX[this.rayon + 1][r];
      positions.push({ x: round.x + this.x, y: round.y + this.y });
    }

    this.getOnPositions(positions, (objs) => {
      this.addPositions(objs);
      this.draw();
      this.moveView(0, 0);
    });
  }
  addPositions(objs) {
    while (objs.length > 0) {
      for (let r = 0; r < this.ROUND_MATRIX[this.rayon + 1].length; r++) {
        let round = this.ROUND_MATRIX[this.rayon + 1][r];
        let px = round.x + this.x;
        let py = round.y + this.y;

        if (px == objs[0].x && py == objs[0].y) {
          this.roundMatrix[r].push(objs[0]);
        }
      }
      objs.splice(0, 1);
    }
  }
  getOnPositions(positions: { x: number; y: number }[], callback) {
    this.socket.emit("getOnPositions", positions, callback);
  }
  moveView(x: number, y: number) {
    let newCenterX = this.x + x;
    let newCenterY = this.y + y;
    let need = [];
    let newMatrix = [];
    for (let r = 0; r < this.ROUND_MATRIX[this.rayon + 1].length; r++) {
      let round = this.ROUND_MATRIX[this.rayon + 1][r];
      let nX = round.x + newCenterX;
      let nY = round.y + newCenterY;

      let newArr = [];

      for (let r2 = 0; r2 < this.ROUND_MATRIX[this.rayon + 1].length; r2++) {
        let round2 = this.ROUND_MATRIX[this.rayon + 1][r2];
        let oldX = round2.x + this.x;
        let oldY = round2.y + this.y;
        if (nX === oldX && nY === oldY) {
          for (let oldObj of this.roundMatrix[r2]) {
            newArr.push(oldObj);
          }
          break;
        }
      }
      newMatrix.push(newArr);
      if (newArr.length <= 0) {
        need.push({ x: nX, y: nY });
      }
    }

    for (let r = 0; r < this.ROUND_MATRIX[this.rayon + 1].length; r++) {
      while (this.roundMatrix[r].length > 0) {
        this.roundMatrix[r].splice(0, 1);
      }
      for (let newObj of newMatrix[r]) {
        this.roundMatrix[r].push(newObj);
      }
    }
    this.x += x;
    this.y += y;
    this.posBehavior.next({ x: this.x, y: this.y });
    this.draw();

    this.getOnPositions(need, (objs) => {
      this.addPositions(objs);
      this.focused.next(this.roundMatrix[0]);
      this.draw();
    });
  }
  moveObj(obj: Object) {
    //1-tu trouve l'objet => l'effacer de la case.
    //2-tu trouve la position nouvelle de l'objet => l'ajouter dans la case

    for (let mats of this.roundMatrix) {
      for (let i = mats.length - 1; i >= 0; i--) {
        if (mats[i]["id"] === obj["id"]) {
          mats.splice(i, 1);
        }
      }
    }

    for (let r = 0; r < this.ROUND_MATRIX[this.rayon + 1].length; r++) {
      let round = this.ROUND_MATRIX[this.rayon + 1][r];
      let px = round.x + this.x;
      let py = round.y + this.y;
      if (obj["position"]["x"] === px && obj["position"]["y"] === py) {
        this.roundMatrix[r].push(obj);
      }
    }
    this.draw();
  }

  mouseDown(event) {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const size = Math.min(
      width / this.rayon / 2,
      height / this.rayon / 2 / this.ratioY
    );
    let px = event.clientX - width / 2;
    let py = event.clientY - width / 2;

    let caseX = Math.floor(px / size + 0.5 - py / size / this.ratioY);
    let caseY = Math.floor(py / size / this.ratioY + (px / size + 0.5));

    console.log(caseX, caseY);

    for (let i = 0; i < this.viewMatrix.length; i++) {
      let view = this.VIEW_MATRIX[this.rayon][i];
      if (view.x == caseX && view.y == caseY) {
        console.log("TOUCHE");
        this.focusCase(this.viewMatrix[i]);
        this.draw();
        break;
      }
    }
  }
  focusCase(cases: Object[]) {
    if (cases !== null) {
      this.focused.next(cases);
    }
  }

  draw() {
    const context = this.canvas.getContext("2d");

    const width = this.canvas.width;
    const height = this.canvas.height;
    const size = Math.min(
      width / this.rayon / 2,
      height / this.rayon / 2 / this.ratioY
    );

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.save();
    context.translate(width / 2, height / 2 - size / 4);

    for (let z = 0; z < 3; z++) {
      for (let i = 0; i < this.VIEW_MATRIX[this.rayon].length; i++) {
        let round = this.VIEW_MATRIX[this.rayon][i];
        let vBoxes = this.viewMatrix[i];

        let x = (round.x * size) / 2 + round.y * size * 0.5;
        let y =
          (round.y * size * this.ratioY) / 2 -
          (round.x * size * this.ratioY) / 2;
        context.translate(x, y);

        if (this.focused.getValue() && this.focused.getValue() === vBoxes) {
          context.globalAlpha = 0.5;
        } else {
          context.globalAlpha = 1.0;
        }

        if (vBoxes !== null) {
          for (let vBox of vBoxes) {
            if (this.zOrder[vBox["key"]] === z && this.images[vBox["key"]]) {
              context.drawImage(
                this.images[vBox["key"]],
                -size / 2,
                -size / 2,
                size,
                size
              );
            }
          }
        } else {
        }
        context.translate(-x, -y);
      }
    }
    context.restore();
  }
}
