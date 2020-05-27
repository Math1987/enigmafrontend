import {Route, RouterModule} from '@angular/router';
import {PlayerComponent} from './player.component';
import {MapComponent} from './map/map.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {CharacterComponent} from './character/character.component';

/**
 * Routes players are actived when module is lazy loaded.
 * Give access to map, character, forum, ranks, profile
 * If user have admin's right, set route to lazy loading admin part
 */
const GAME_ROUTES: Route[] = [
  {path: '', component : PlayerComponent, canActivate: [AuthGuard], children : [
      {path : 'map', component: MapComponent},
      {path : 'character', component: CharacterComponent},
      {path : 'profile', component: ProfileComponent},
      {path : 'admin', loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule)},
      {path : '**', redirectTo : 'map', pathMatch: 'full'}
    ]},
];

export const PlayerRouting = RouterModule.forChild(GAME_ROUTES);
