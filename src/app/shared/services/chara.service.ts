import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Chara} from '../models/chara.model';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {UserModel} from '../models/user.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CharaService {

  character : BehaviorSubject<Chara> = new BehaviorSubject<Chara>(null);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService : UserService
  ) {

    this.userService.currentUser.subscribe(user =>{
      if ( user !== null ){
        console.log(user);
        this.http.post(`${environment.backURL}/u/chara`, user).subscribe(charaRes => {
          if ( charaRes ){
            this.character.next(<Chara>charaRes);
          }
          console.log(charaRes);
        }, error => {
          this.character = null ;
        });
      }else{
        this.character.next(null);
      }
    });

  }

  getCurrentChara(){
    return this.character ;
  }

  create(chara:Chara){
    chara['id'] = this.userService.currentUser.getValue().id ;
    this.http.post(`${environment.backURL}/u/createChara`, chara).subscribe(newChara => {
      if ( newChara ){
        this.authService.refreshToken().subscribe( res => {
          console.log(newChara);
          if ( res && newChara){
            this.character.next(<Chara> newChara);
          }

        });
      }
      console.log(newChara);
    });
  }



}
