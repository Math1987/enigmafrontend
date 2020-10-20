import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( private router : Router, private route : ActivatedRoute, private account : AccountService ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams.code);
    this.code = this.route.snapshot.queryParams.code ;
  }
  validate(){
      console.log(this.formGroup.value);
      if ( this.code ){
        this.account.confirmResetPassword( this.code, this.formGroup.value['password'], res => {
          
          console.log(res);
          if ( res ){
            alert('votre mot de passe a bien été réinitialisé.');
            this.router.navigate(['/connection']);
          }else{
            alert('une petite erreur est survenue. Reessayez plus tard.');
          }


        }) ;
      }
  }

}
