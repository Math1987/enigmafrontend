import { Component, OnInit } from '@angular/core';
import {ValuesService} from '../../shared/services/values.service';
import {MetaService} from '../../shared/services/meta.service';

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.scss']
})
export class PlayerContainerComponent implements OnInit {

  constructor(
    public valueService : ValuesService,
    public metadatas : MetaService
  ) { }

  ngOnInit(): void {

    this.valueService.values.subscribe((res)=>{

    });

  }

}
