import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {PlayerComponent} from './player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {PlayerRouting} from './player.routing';
import {FlexModule} from '@angular/flex-layout';
import {MapComponent} from './map/map.component';
import {ProfileComponent} from './profile/profile.component';
import {CharacterComponent} from './character/character.component';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UserService} from '../shared/services/user.service';
import {CharaService} from '../shared/services/chara.service';
import { CreateComponent } from './create/create.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * Player module is lazy loaded if the user is authenticated (from connection's route or with local token)
 * give all needed as user informations (profile) and game components (map, character, forum, ranks etc...)
 * use FlexLayout and Material
 */

const MATERIALS = [
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    PlayerComponent,
    ProfileComponent,
    MapComponent,
    CharacterComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlayerRouting,
    FlexModule,
    MATERIALS,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UserService,
    CharaService
  ]
})
export class PlayerModule { }
