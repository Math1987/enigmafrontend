import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CharaService} from '../../shared/services/chara.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formGroup : FormGroup ;
  gender: string;
  name: string = '';
  race: string = 'human' ;
  religion: string = 'hermes';

  constructor(
    private charaService: CharaService,
    private router : Router
  ) {

    this.formGroup = new FormGroup({
        name : new FormControl('', Validators.required),
        race : new FormControl('dwarf'),
        religion : new FormControl('demeter')
    });

    this.charaService.character.subscribe(res => {
      if ( res === null ){
        //this.router.navigate(['u']);
      }
    });

  }

  ngOnInit(): void {
  }

  create(){

    if ( this.formGroup.valid ){
      this.charaService.create(this.formGroup.value);
    }

  }

}
