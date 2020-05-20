import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {GameComponent} from './game/game.component';
import {UserService} from './services/user.service';
import {MapComponent} from './game/player/map/map.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'u', component : GameComponent, canActivate: [UserService], children : [
      {path : '**', redirectTo : "u/map", pathMatch: "full"},
      {path : 'map', component: MapComponent}
    ]},

  {path: '', redirectTo : 'u', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
