import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {JwtToken} from '../shared/models/jwt.token';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../shared/models/user.model';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {tap, withLatestFrom} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserService} from '../shared/services/user.service';
import {CharaService} from '../shared/services/chara.service';
import {Chara} from '../shared/models/chara.model';

/**
 * Main player's component (calling "u" in routes)
 * Contain the nav-bar menu for player
 * send with router-outlet to focused component (map, character etc...)
 * When build, check token status and kik out if not valid
 */
@Component({
  selector: 'app-game',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations : [
    trigger('intro', [
      state('normal', style({
        opacity: 1.0,
        top : `0px`
      })),
      transition('* => normal', animate(`1s 0ms ease-out`))
    ])
  ]
})
export class PlayerComponent implements OnInit, OnDestroy {

  public jwtToken: JwtToken;
  public subscription: Subscription;
  public currentUser: Observable<UserModel> ;
  public currenChara : BehaviorSubject<Chara> ;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private charaService : CharaService
  ) {
    this.http.get<UserModel>(`${environment.backURL}/user`).subscribe(( res) => {
      if ( res === null ){
        localStorage.removeItem(AuthService.LOCAL_JWT);
        this.router.navigate(['connexion']);
      }
    }, (error) => {
      localStorage.removeItem(AuthService.LOCAL_JWT);
      this.router.navigate(['connexion']);
    });
  }

  ngOnInit(): void {
    this.subscription = this.authService.jwtToken.subscribe((jwtToken) => {
      this.jwtToken = jwtToken;
    });
    this.currentUser = this.userService.getCurrentUser();
    this.currenChara = this.charaService.getCurrentChara();

    this.currenChara.subscribe(character =>{
      console.log(character);
      if ( character ){
        console.log(this.currenChara.getValue());
      }else{
        this.router.navigate(["u/bienvenue"]);
      }
    });

  }

  public deconnection(): void {
    this.authService.logout();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
