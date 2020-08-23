import { WorldViewverService } from "./world-viewver.service";
import { Socket } from "socket.io";
import { BehaviorSubject } from "rxjs";
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  ElementRef,
  AfterContentInit,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-world-viewver",
  templateUrl: "./world-viewver.component.html",
  styleUrls: ["./world-viewver.component.scss"],
})
export class WorldViewverComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas") public canvas: ElementRef;
  @Input("character") public character: BehaviorSubject<Object> = null;
  @Input("socket") public socket: BehaviorSubject<Socket> = null;
  @Output() public focusCase: EventEmitter<Object[]> = new EventEmitter<
    Object[]
  >();

  constructor(public worldService: WorldViewverService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.socket) {
        this.socket.subscribe((socket) => {
          console.log(socket);
          if (socket) {
            this.worldService.init(
              this.character,
              socket,
              this.canvas.nativeElement
            );
            this.character.subscribe((chara) => {});
            this.worldService.focused.subscribe((cases) => {
              this.focusCase.emit(cases);
            });
          }
        });
      }
    }, 300);
  }

  move(x: number, y: number) {
    if (
      this.socket.getValue() &&
      this.character.getValue() &&
      this.character.getValue()["move"] &&
      this.character.getValue()["move"] > 0
    ) {
      this.socket.getValue().emit("move", x, y, (moverRes) => {
        if (moverRes) {
          // let newChara = this.character.getValue();
          // newChara["position"]["x"] += x;
          // newChara["position"]["y"] += y;
          //this.character.next(newChara);
          this.worldService.moveView(x, y);
        }
      });
    }
  }

  updateLocalPositions(positions: []) {}
}