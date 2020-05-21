import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * This component is used if user is not connected.
   * Give possibility to create account
   * using FormGroup
   */

  formGroup : FormGroup ;

  constructor(
    private http: HttpClient,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email], this.validateEmail.bind(this)),
      password : new FormControl("", Validators.required)
    });
  }

  /**
   * This validator call backend to check if the value (as email) in the form control is in the database
   * @param formControl
   */
  validateEmail(formControl : FormControl): Promise<any> | Observable<any>{
    console.log('try validate email');
    const self = this ;
    return new Promise( (resolve, reject)=>{
      self.http.get(`${environment.backURL}/checkEmail?email=${formControl.value}`).subscribe(
        (res) =>{
          console.log('res');
        if ( res ){
          resolve(null);
        }else{
          resolve({emailNotExist : true});
        }
      }, (err) => {
          console.log('error');
          resolve({backend: true});
        });
    });
  }

  /**
   * ask to the user service to login and set password error if response is false
   * @param formControl
   */
  login(){
    const self = this ;
    this.userService.login(this.formGroup.value.email, this.formGroup.value.password, function(res) {
      if ( !res ){
        self.formGroup.controls.password.setErrors(
          { password: false}
        ) ;
      }
    });
  }

}
