import {Component, OnInit} from '@angular/core';
import {GoogleSignInSuccess} from 'angular-google-signin';

/**
 * app component use router-outler
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  private myClientId: string = 'AIzaSyB7LaNqZHdC-fmvm_b_l2LYaH_vuae7KB8.apps.googleusercontent.com';

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }
}
