import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-account.connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  animations : [
    trigger('intro', [
      state('normal',style({
        opacity: 1.0,
        top : `0px`
      })),
      transition('* => normal', animate(`1s 0ms ease-out`))
    ])
  ]
})
export class ConnectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
