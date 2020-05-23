import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {JwtToken} from '../../models/jwt.token';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  public jwtToken: JwtToken ;
  public subscription : Subscription ;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const self = this ;
    console.log('topBar init');
    this.subscription = this.userService.jwtToken.subscribe( (jwtToken ) => {
      self.jwtToken = jwtToken ;
      console.log(jwtToken)
    });

  }

  public deconnection(): void{
    this.userService.logout();
  }


  ngOnDestroy(): void {
    if ( this.subscription ){
      this.subscription.unsubscribe();
    }
  }



}
