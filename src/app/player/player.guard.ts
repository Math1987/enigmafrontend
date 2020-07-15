import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PlayerComponent} from './player.component';
import {UserService} from '../shared/services/user.service';
import {ValuesService} from '../shared/services/values.service';
import {CharaService} from '../shared/services/chara.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerGuard implements CanActivate, CanDeactivate<PlayerComponent> {


  constructor(
    private userService: UserService,
    private charaService: CharaService,
    private valuesService : ValuesService
  ) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can activate PlayerGuard');
    this.userService.init() ;
    this.charaService.init();
    this.valuesService.init() ;
    return true ;
  }
  canDeactivate(component: PlayerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can deactivate PlayerGuard');
    this.userService.destroy() ;
    this.charaService.destroy();
    this.valuesService.destroy() ;
    return true;
  }
}
