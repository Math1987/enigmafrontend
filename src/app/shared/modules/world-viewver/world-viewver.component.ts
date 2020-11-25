import { CharaService } from "./../../services/chara.service";
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
  OnDestroy,
} from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-world-viewver",
  templateUrl: "./world-viewver.component.html",
  styleUrls: ["./world-viewver.component.scss"],
})
export class WorldViewverComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("canvas") public canvas: ElementRef;
  @Input("character") public character: BehaviorSubject<Object> = null;
  @Input("socket") public socket: BehaviorSubject<Socket> = null;
  @Output() public focusCase: EventEmitter<Object[]> = new EventEmitter<
    Object[]
  >();
  @Output() public moveRequest : EventEmitter<{x : number, y : number}> = new EventEmitter<
    {x : number, y : number}
  >();

  constructor(
    public worldService: WorldViewverService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {
    this.worldService.destroy();
  }
  updateObjs(objs, callback){
    this.worldService.updateObjs(objs);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.socket) {
        this.socket.subscribe((socket) => {
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

  moveEvent(x: number, y: number) {
    this.moveRequest.emit({x : x, y : y});
  }


  getFocusedPosition() {
    return this.worldService.focused.pipe(
      map((arrFocus) => {
        if (arrFocus && arrFocus.length > 0 && arrFocus[0]["x"]) {
          return { x: arrFocus[0]["x"], y: arrFocus[0]["y"] };
        }
      })
    );
  }

  updateLocalPositions(positions: []) {}
}
