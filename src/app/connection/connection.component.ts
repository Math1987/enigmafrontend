import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
      state('start', style({
        opacity: 0.0,
        transform : 'scale(0.9,0.9)'
      })),
      state('normal', style({
        opacity: 1.0,
        transform : 'scale(1.0,1.0)'
      })),
      transition('* => normal', animate(`1000ms 0ms ease-out`))
    ])
  ]
})
@Input('class')
export class ConnectionComponent implements OnInit {

  introAnimation:string = 'start' ;



  constructor(
    private animationService : AnimationService
  ) {
    localStorage.removeItem(AuthService.LOCAL_JWT);
    this.animationService.background_state.next('wait') ;
    console.log('build connection component');
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.introAnimation = "normal";
    },10);
    console.log('init connection component');
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
