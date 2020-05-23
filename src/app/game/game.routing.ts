import {Route, RouterModule} from '@angular/router';
import {GameComponent} from './game.component';
import {UserService} from '../shared/services/user.service';
import {MapComponent} from './player/map/map.component';

const GAME_ROUTES: Route[] = [
  {path: 'u', component : GameComponent, canActivate: [UserService], children : [
      {path : '**', redirectTo : "u/map", pathMatch: "full"},
      {path : 'map', component: MapComponent}
    ]},
];

export const GameRouting = RouterModule.forChild(GAME_ROUTES);
