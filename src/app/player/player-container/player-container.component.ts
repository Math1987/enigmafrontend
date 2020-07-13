import { Component, OnInit } from '@angular/core';
import {ResourcesService} from '../../shared/services/resources.service';
import {MetaService} from '../../shared/services/meta.service';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.scss']
})
export class PlayerContainerComponent implements OnInit {

  constructor(
    public resources : ResourcesService,
    public metadatas : MetaService
  ) { }

  ngOnInit(): void {

    this.resources.resources.subscribe((res)=>{
      console.log(res) ;
    });

  }

}
