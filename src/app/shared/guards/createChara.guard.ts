import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CharaService} from '../services/chara.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateCharaGuard implements CanActivate{

  constructor(
    private charaService: CharaService,
    private router: Router
  ){}
  /**
   * check if the user got a character registed and actived.
   * use characterService's ReplaySubject character
   * with a pipe operator to transform value to boolean
   * if fot one, kik out of creation character
   * else allow route.
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.charaService.character.pipe(
      map(res=>{
        if ( res ){
          this.router.navigate(['u']);
          return false ;
        }else{
          return true ;
        }
      })
    );
  }



}
