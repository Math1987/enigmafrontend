import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  /**
   * This component use GormGroup for sign in application
   * check dynamically if email exist with async validator and customised pipe
   */
  formGroup : FormGroup ;

  constructor(
    private http: HttpClient,
    private userService : AuthService,
    private router : Router
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
    const self = this ;
    return new Promise( (resolve, reject)=>{
      self.http.get(`${environment.backURL}/checkEmail?email=${formControl.value}`).subscribe(
        (res) =>{
        if ( res ){
          resolve(null);
        }else{
          resolve({emailNotExist : true});
        }
      }, (err) => {
          resolve({backend: true});
        });
    });
  }

  /**
   * ask to the user service to signIn and set password error if response is false
   * @param formControl
   */
  login(){
    if ( this.formGroup.valid ){
      this.userService.signIn(this.formGroup.value).subscribe( (res) =>{
        this.router.navigate(['u']);
      });
    }
  }

}
