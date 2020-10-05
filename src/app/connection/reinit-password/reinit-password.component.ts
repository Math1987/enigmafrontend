import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrls: ['./reinit-password.component.scss']
})
export class ReinitPasswordComponent implements OnInit {

  formGroup = new FormGroup({
      password : new FormControl(''),
      confirm : new FormControl('')
    }
  )

    code = null ;

  constructor( private router : ActivatedRoute, private account : AccountService ) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.queryParams.code);
    this.code = this.router.snapshot.queryParams.code ;
  }
  validate(){
      console.log(this.formGroup.value);
      if ( this.code ){
        this.account.confirmResetPassword( this.code, this.formGroup.value['password'], res => {
          
        }) ;
      }
  }

}
