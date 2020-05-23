import {Component, ElementRef, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /**
   * This component is used if user is not connected.
   * Give possibility to signIn or create account
   * using FormGroup
   */

  public formGroup : FormGroup ;

  constructor(
    private http: HttpClient,
    private userService : UserService,
    private router : Router
) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name : new FormControl('', Validators.required, this.validateName.bind(this)),
      email : new FormControl("", [Validators.required, Validators.email], this.validateEmail.bind(this)),
      password : new FormControl("", [Validators.required]),
      confirm : new FormControl("", [Validators.required, this.matchingConfirm.bind(this)])
    });
  }

  validateName(formControl : FormControl): Promise<any> | Observable<any>{
    const self = this ;
    return new Promise( (resolve, reject)=>{
      self.http.get(`${environment.backURL}/checkAccountName?name=${formControl.value}`).subscribe(
        (res)=>{
        if ( res ){
          resolve({nameExist : true})
        }else{
          resolve(null);
        }
      }, (err) =>{
          resolve({backend : true});
        });
    });
  }
  /**
   * This validator call backend to check if the value (as email) in the form control is in the database
   * @param formControl
   */
  validateEmail(formControl : FormControl): Promise<any> | Observable<any>{
    const self = this ;
    return new Promise( (resolve, reject)=>{
      self.http.get(`${environment.backURL}/checkEmail?email=${formControl.value}`).subscribe(
        (res)=>{
        if ( res ){
          resolve({emailExist : true})
        }else{
          resolve(null);
        }
      }, (err) =>{
          console.log('error');
          resolve({backend: true});
        });
    });
  }
  matchingPassword(formControl: FormControl){
    if ( this.formGroup && this.formGroup.value.confirm !== formControl.value ){
      return {nomatch: true};
    }else{
      return null ;
    }
  }
  matchingConfirm(formControl: FormControl){
    if ( this.formGroup && this.formGroup.value.password !== formControl.value ){
      return {nomatch: true};
    }else{
      return null ;
    }
  }

  /**
   * ask to the user service to signIn and set password error if response is false
   * @param formControl
   */
  create(){
    const self = this ;

    console.log(this.formGroup.value);

    this.userService.signUp(this.formGroup.value).subscribe((res)=>{
      if ( res ){
        console.log(res);
        this.userService.signIn(res).subscribe((signin)=>{
          this.router.navigate(['u','map']);
        });
      }
    });

    /*this.http.post(`${environment.backURL}/createAccount`, {
      name : this.formGroup.value.name,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    }).subscribe((res) => {
      if ( !res ){
        self.formGroup.controls.password.setErrors(
          { password: false}
        ) ;
      }else{
        self.userService.openSession(res);
      }
    });*/
  }

}
