import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  mapImages: {}[] = [
    {
      src: "assets/images/human.png",
    },
  ];

  constructor() {}

  initMapImages() {}
}
