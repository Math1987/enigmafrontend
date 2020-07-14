import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {Chara} from '../models/chara.model';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {UserModel} from '../models/user.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CharaService {

  character : ReplaySubject<Chara> = new ReplaySubject<Chara>(null);
  actualCharacter : Chara = null ;

  /**
   * charaService is used only when player is connected, from player's module.
   * When charaService is instancied, it observe the currentUser
   * and when get id, ask the character to backend.
   * If got it, then build it,
   * else, navigate to creation page.
   * @param http
   * @param router
   * @param authService
   * @param userService
   */
  constructor(
    private http: HttpClient,
    private router : Router,
    private authService: AuthService,
    private userService : UserService
  ) {
    this.userService.currentUser.subscribe(user =>{
      if ( user !== null ){
        this.http.post<Chara>(`${environment.apiURL}/u/chara`, user).subscribe(charaRes => {
          if ( charaRes ){
            this.actualCharacter = charaRes ;
            this.character.next(charaRes);

          }else{
            this.router.navigate(['u/bienvenue']);
            this.actualCharacter = null ;
            this.character.next(null);
          }
        }, error => {
          this.router.navigate(['u/bienvenue']);
          this.actualCharacter = null ;
          this.character.next(null) ;
        });
      }else{
        this.actualCharacter = null ;
        this.character.next(null);
      }
    });

  }

  getCurrentCharaObservable():ReplaySubject<Chara>{
    return this.character ;
  }
  getCharacter(){
    return this.actualCharacter ;
  }

  create(chara:Chara){
    chara['id'] = this.userService.getCurrentUser().id ;
    this.http.post(`${environment.apiURL}/u/createChara`, chara).subscribe(newChara => {
      if ( newChara ){
        this.authService.refreshToken().subscribe( res => {
          if ( res && newChara){
            this.character.next(<Chara> newChara);
            this.router.navigate(['u']);
          }

        });
      }
    });
  }



}
