import { TokenService } from "./token.service";
import { AccountService } from "./account.service";
import { BehaviorSubject } from "rxjs";
import { Socket } from "socket.io";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: Socket = null;
  socketObservable: BehaviorSubject<Socket> = new BehaviorSubject(null);

  constructor(
    public tokenService: TokenService,
    public accountService: AccountService
  ) {
    this.accountService.account.subscribe((account) => {
      if (account) {
        console.log("init socket");
        this.socket = io.connect(`${environment.backURL}`, {
          query: { token: tokenService.token },
        });
        this.socketObservable.next(this.socket);
      }
    });
    // this.authService.jwtToken.subscribe((res) => {
    //   if (res && res.token && res.isAuthenticated && this.socket === null) {
    //     this.socket = io.connect(`${environment.backURL}`, {
    //       query: { token: res.token },
    //     });
    //     this.socketObservable.next(this.socket);
    //   }
    // });
  }
}
