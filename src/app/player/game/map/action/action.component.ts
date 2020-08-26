import { CharaService } from "./../../../../shared/services/chara.service";
import { SocketService } from "./../../../../shared/services/socket.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
})
export class ActionComponent implements OnInit {
  @Input("key") public key: string = "";
  @Input("disabled") public disabled: boolean = false;
  @Input("user") public user: Object = null;
  @Input("target") public target: Object = null;
  @Output("click") public click: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private charaService: CharaService
  ) {}

  ngOnInit(): void {}

  canAttack() {
    if (
      this.user &&
      this.user["action"] &&
      this.user["action"] > 0 &&
      this.target &&
      this.user["id"] !== this.target["id"] &&
      this.target["life"] &&
      this.target["life"] > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  use() {
    if (!this.disabled) {
      this.click.emit(true);
    }
  }
}
