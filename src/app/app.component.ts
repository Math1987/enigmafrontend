import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {AnimationService} from './shared/services/animation.service';
import {BehaviorSubject} from 'rxjs';


/**
 * app component use router-outler
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations : [ trigger('intro', [
    state('null', style({
      transform: 'scale(1.2, 1.2)',
      filter: 'blur(10px)',
      opacity:'0'
    })),
    state('wait', style({
      transform: 'scale(1.1, 1.1)',
      opacity:'1.0'
    })),
    state('normal', style({
      transform: 'scale(1.1, 1.1)',
      filter: 'blur(0px)',
      opacity:'1.0'
    })),
    transition('null => normal', animate(`1s 0ms ease-out`)),
    transition('null => wait', group([
      animate(`1s 0ms ease-out`, style({opacity:'1.0',transform:'scale(1.1,1.1)'})),
      animate(`3s 1000ms ease-out`, style({ filter: 'blur(0px)'})),
    ])),

    transition('wait => normal', animate(`1s 0ms ease-in`))
  ])]
})
export class AppComponent implements OnInit{

  constructor(
    private animationService: AnimationService
  ) {
  }

  ngOnInit() {

  }
  getBackgroundState(){
    return this.animationService.background_state ;
  }

}
