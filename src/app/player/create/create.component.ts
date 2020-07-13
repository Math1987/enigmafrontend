import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CharaService} from '../../shared/services/chara.service';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {MetaService} from '../../shared/services/meta.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations : [
    trigger('start', [
      state('normal', style({
        opacity: 1.0
      })),
      transition('* => normal', animate(`1s 0ms ease-in`))
    ])
  ]
})
export class CreateComponent implements OnInit {

  formGroup : FormGroup ;
  name: string = '';
  religion: string = 'godWater';

  metaDatasSubject : ReplaySubject<any> ;

  constructor(
    private charaService: CharaService,
    public metaService : MetaService
  ) {

    this.formGroup = new FormGroup({
        name : new FormControl('', Validators.required),
        sexe : new FormControl('masculin'),
        race : new FormControl('human'),
        religion : new FormControl('godWater')
    });

    this.metaDatasSubject = metaService.metaDatasSubject ;

  }

  ngOnInit(): void {
  }

  setGender(gender){
    this.formGroup.controls.sexe.setValue(gender) ;
  }

  create(){
    if ( this.formGroup.valid ){
      this.charaService.create(this.formGroup.value);
    }
  }

}
