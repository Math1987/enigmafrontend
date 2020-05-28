import {Component, OnInit} from '@angular/core';
import {GoogleSignInSuccess} from 'angular-google-signin';
import {AuthService} from './shared/services/auth.service';

/**
 * app component use router-outler
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

  }

}
