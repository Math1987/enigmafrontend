import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MetaService } from "../../services/meta.service";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit, AfterViewInit {
  @Input("number") public numb: number = 0;
  @Input("key") public key: string = null;
  @Input("size") public size: number = 64;
  @Input("disabled") public disabled: boolean = false;
  @ViewChild("icon") icon: ElementRef;

  description: string = null;

  constructor(public metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.metaDatasSubject.subscribe((datas) => {
      const resources = this.metaService.getAll("resource");

      if (
        this.key &&
        resources[this.key] &&
        resources[this.key]["description_fr"]
      ) {
        this.description = resources[this.key]["description_fr"];
      }
    });
  }

  ngAfterViewInit(): void {
    this.metaService.icons.keys.subscribe((keys) => {
      if (keys) {
        if (this.key && keys[this.key] && keys[this.key]["icon"]) {
          this.numb = keys[this.key]["icon"];
        }

        let img = this.icon.nativeElement;
        img.style.width = `${this.size}px`;
        img.style.height = `${this.size}px`;
        img.style.background = `url(${this.metaService.icons.src})`;
        img.style.backgroundSize = `
      ${
        (this.metaService.icons.img.width /
          (this.metaService.icons.img.width / this.metaService.icons.rangeX)) *
        this.size
      }px
       ${
         (this.metaService.icons.img.height /
           (this.metaService.icons.img.height /
             this.metaService.icons.rangeY)) *
         this.size
       }px
      `;

        img.style.backgroundPositionX = `${
          -Math.floor(this.numb % this.metaService.icons.rangeX) * this.size
        }px`;
        img.style.backgroundPositionY = `${
          -Math.floor(this.numb / this.metaService.icons.rangeX) * this.size
        }px`;
      }
    });
  }
}
