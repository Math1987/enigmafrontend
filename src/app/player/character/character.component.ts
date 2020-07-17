import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ValuesService} from '../../shared/services/values.service';
import {pops} from '../../shared/animations/pops';
import {map} from 'rxjs/operators';

/**
 * Character component
 */
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  animations: [
    pops
  ]
})
export class CharacterComponent implements OnInit {

  skillsAnimator: string = 'start' ;

  constructor(
    private http : HttpClient,
    public valueService : ValuesService
  ) { }

  ngOnInit() {

    setTimeout(()=>{
      this.skillsAnimator = "normal" ;
    }, 10);


  }
  gotSkillsAdder(number: number){
    return this.valueService.getValue('addskills').pipe(
      map( res =>{
      console.log(res );
      if ( res < number ){
        return true ;
      }else{
        return false ;
      }
    })
  );
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
