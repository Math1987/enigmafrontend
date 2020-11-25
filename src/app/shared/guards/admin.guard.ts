import { AccountService } from "./../services/account.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminService } from '../services/admin.service';

/**
 * Guard canActivate if the user is authenticated and have admin rights.
 */
@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.adminService.getAdmin().pipe(
      map((admin) => {
        console.log('ACCOUNT READ IN ADMIN', admin);
        if (admin) {
          route.url[0].path = admin['admin'] ;
          return true;
        } else {
          this.router.navigate(["/admin/login"]);
          return true;
        }
      })
    );
  }
}
