import {animate, state, style, transition, trigger} from '@angular/animations';

export let pops = trigger('pops', [
  state('start', style({
    opacity: 0.0,
    transform: 'scale(0.95,0.95)'
  })),
  state('normal', style({
    opacity: 1.0,
    transform: 'scale(1.0,1.0)'
  })),
  transition('* => normal', animate(`500ms 0ms ease-out`))
]);
