import { Component, OnInit } from '@angular/core';
import {ValuesService} from '../../shared/services/values.service';
import {MetaService} from '../../shared/services/meta.service';
import {pops} from '../../shared/animations/pops';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-toolbar.component.html',
  styleUrls: ['./player-toolbar.component.scss'],
  animations: [
    pops
  ]
})
export class PlayerToolbarComponent implements OnInit {

  popsAnimator = 'start' ;

  constructor(
    public valueService : ValuesService,
    public metadatas : MetaService
  ) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.popsAnimator = "normal" ;
    },750);


  }

}
