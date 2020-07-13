import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  /**
   * This component use GormGroup for sign in application
   * check dynamically if email exist with async validator and customised pipe
   */
  formGroup: FormGroup ;

  constructor(
    private http: HttpClient,
    private userService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email], this.validateEmail.bind(this)),
      password : new FormControl('', Validators.required)
    });

    //this.googleSDK();
  }

  /**
   * This validator call backend to check if the value (as email) in the form control is in the database
   * @param formControl as email input
   */
  validateEmail(formControl: FormControl): Promise<any> | Observable<any> {
    console.log (`${environment.apiURL}/checkEmail?email=${formControl.value}`);
    return new Promise( (resolve, reject) => {
      this.http.get(`${environment.apiURL}/checkEmail?email=${formControl.value}`).subscribe(
        (res) => {
        if ( res ) {
          resolve(null);
        } else {
          resolve({emailNotExist : true});
        }
      }, (err) => {
          resolve({backend: true});
        });
    });
  }

  /**
   * ask to the user service to signIn
   * if subscription is correct,
   * navigate to the player's route
   */
  login() {
    if ( this.formGroup.valid ) {
      this.userService.signIn(this.formGroup.value).subscribe( (res) => {
        this.router.navigate(['u']);
      });
    }
  }




  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });

  }
  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '212493728126-dr3lerpm5vnbbhqnavjqdfucd1ddbtef.apps.googleusercontent.com',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }



}
