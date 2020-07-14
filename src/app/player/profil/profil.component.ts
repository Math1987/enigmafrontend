import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import { Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';

import {CharaService} from '../../shared/services/chara.service';
import {Chara} from '../../shared/models/chara.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * profil component give a visual interface containing all the user personnal informations
 * as name, email, avatar etc..
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  animations : [
    trigger('intro', [
      state('normal', style({
        opacity: 1.0,
      })),
      transition('* => normal', animate(`1s 0ms ease-out`))
    ])
  ]
})
export class ProfilComponent implements OnInit {

  openAvatarFile(){
    let input_ = document.getElementById("avatarInputFile") as HTMLInputElement ;
    input_.click();
  }
  setAvatarFile(event){

  }

  /**
   * CurrentUser is an observable taken from the userService.
   * see the userService to see how it work.
   * use pipe async in html to show informations how they come
   */
  public currentUser: Observable<UserModel> ;
  public currentChara: Observable<Chara> ;

  /**
   * ProfileComponent is build when Player's module is lazy loaded (if user is connected)
   * @param userService: give the observable currentUser
   */
  constructor(
    private userService: UserService,
    private charaService: CharaService
  ) { }

  /**
   * take the userService's currentUser observable's pointer
   */
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUserObservable();
    this.currentChara = this.charaService.getCurrentCharaObservable();
  }


}