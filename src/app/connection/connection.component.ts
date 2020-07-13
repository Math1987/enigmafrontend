import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../shared/services/auth.service';
import {AnimationService} from '../shared/services/animation.service';

/**
 * Connection's component manage signIn component and signUp component
 * Use animations trigger for fun
 */
@Component({
  selector: 'app-account.connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  animations : [
    trigger('intro', [
      state('normal', style({
        opacity: 1.0,
        transform : 'scale(1)'
      })),
      transition('* => normal', animate(`1000ms 0ms ease-out`))
    ])
  ]
})
@Input('class')
export class ConnectionComponent implements OnInit {

  constructor(
    private animationService : AnimationService
  ) {
    localStorage.removeItem(AuthService.LOCAL_JWT);
    this.animationService.background_state.next('wait') ;
  }

  ngOnInit(): void {

  }
  heightIn(){
    if ( document.getElementById('signContent') &&  document.getElementById('signContent').offsetHeight < window.innerHeight ){
      return true ;
    }else{
      return false ;
    }
    return true ;
  }

}
