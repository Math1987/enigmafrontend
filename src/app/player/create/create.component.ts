import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CharaService} from '../../shared/services/chara.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formGroup : FormGroup ;

  constructor(
    private charaService: CharaService
  ) {

    this.formGroup = new FormGroup({
        name : new FormControl('', Validators.required),
        race : new FormControl('dwarf'),
        religion : new FormControl('demeter')
    });

  }

  ngOnInit(): void {
  }

  create(){

    if ( this.formGroup.valid ){
      this.charaService.create(this.formGroup.value);
    }
    console.log(this.formGroup.value );

  }

}
