import { Injectable } from '@angular/core';
import { Socket } from 'dgram';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class AdminWorldSocketService {

  socket: Socket = null;
  socketObservable: BehaviorSubject<Socket> = new BehaviorSubject(null);

  constructor(
    public tokenService: TokenService,
    public adminService : AdminService
  ) {
    this.adminService.getAdmin().subscribe((admin) => {
     
      console.log('admin for socket', admin, tokenService.token) ;
      if (admin) {

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
