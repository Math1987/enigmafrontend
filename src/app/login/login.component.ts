import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * This component is used if user is not connected.
   * Give possibility to login or create account
   * using FormGroup
   */

  loginFormGroup : FormGroup ;
  createFormGroup : FormGroup ;

  constructor(
    private http: HttpClient,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email], this.validateEmail.bind(this)),
      password : new FormControl("", Validators.required)
    });
  }

  /**
   * This validator call backend to check if the value (as email) in the form control is in the database
   * @param formControl
   */
  validateEmail(formControl : FormControl): Promise<any> | Observable<any>{
    const self = this ;
    return new Promise( (resolve, reject)=>{
      self.http.get(`${environment.backURL}/checkEmail?email=${formControl.value}`).subscribe((res)=>{
        console.log(res);
        if ( res ){
          resolve(null);
        }else{
          resolve({email : false})
        }
      });
    });
  }

  /**
   * ask to the user service to login and set password error if response is false
   * @param formControl
   */
  login(){
    const self = this ;
    this.userService.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password, function(res) {
      if ( !res ){
        self.loginFormGroup.controls.password.setErrors(
          { password: false}
        ) ;
      }
    });
  }

}
