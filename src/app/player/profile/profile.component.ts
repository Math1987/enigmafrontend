import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * profil component give a visual interface containing all the user personnal informations
 * as name, email, avatar etc..
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /**
   * CurrentUser is an observable taken from the userService.
   * see the userService to see how it work.
   * use pipe async in html to show informations how they come
   */
  public currentUser: Observable<UserModel> ;

  /**
   * ProfileComponent is build when Player's module is lazy loaded (if user is connected)
   * @param userService: give the observable currentUser
   */
  constructor(
    private userService: UserService
  ) { }

  /**
   * take the userService's currentUser observable's pointer
   */
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

}
