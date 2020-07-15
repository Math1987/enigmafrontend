import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ValuesService} from '../../shared/services/values.service';

/**
 * Character component
 */
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(
    private http : HttpClient,
    public valueService : ValuesService
  ) { }

  ngOnInit() {

  }
  addSkill(skill: {id: string, key_: string, value: number}, value:number){
    this.valueService.addSkill(skill, value).subscribe(res =>{
      if ( res ){
        skill.value = res[skill.key_] ;
        this.valueService.setValue('addskills', res['addskills']);
      }
    }) ;
  }

}
