import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MapViewverService {
  ROUND_MATRIX = null;
  VIEW_MATRIX = null;
  ROUNDS = null;

  constructor() {
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
  /**
   * create arrays for the view.
   * the round array store objects in arrays as rayon + 1
   * the view array store the rounds arrays as the well ordonned matrix VIEW_MATRIX for z-order
   *
   * @param roundMatrix
   * @param viewMatrix
   * @param rayon
   */
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

    return {
      rounds: roundMatrix,
      views: viewMatrix,
    };
  }
}
