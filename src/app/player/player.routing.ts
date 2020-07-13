import {Route, RouterModule} from '@angular/router';
import {PlayerComponent} from './player.component';
import {MapComponent} from './map/map.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {CharacterComponent} from './character/character.component';
import {CreateComponent} from './create/create.component';
import {CreateCharaGuard} from '../shared/guards/createChara.guard';
import {ProfilComponent} from './profil/profil.component';

/**
 * Routes players are actived when module is lazy loaded.
 * Give access to map, character, forum, ranks, profile
 * If user have admin's right, set route to lazy loading admin part
 */
const GAME_ROUTES: Route[] = [
  {path: '', component : PlayerComponent, canActivate: [AuthGuard], children : [
      {path : 'bienvenue', component: CreateComponent, canActivate: [CreateCharaGuard]},
      {path : 'map', component: MapComponent},
      {path : 'perso', component: CharacterComponent},
      {path : 'profil', component: ProfilComponent},
      {path : 'admin', loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule)},
      {path : '', redirectTo : 'map', pathMatch: 'full'},
      {path : '**', redirectTo : 'map', pathMatch: 'full'}
    ]},
];

export const PlayerRouting = RouterModule.forChild(GAME_ROUTES);
