import { WorldViewverModule } from "./../shared/modules/world-viewver/world-viewver.module";
import { NgModule, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { PlayerRouting } from "./player.routing";
import {
  ExtendedModule,
  FlexModule,
  FlexLayoutModule,
} from "@angular/flex-layout";
import { MapComponent } from "./map/map.component";
import { CharacterComponent } from "./character/character.component";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CreateComponent } from "./create/create.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { ProfilComponent } from "./profil/profil.component";
import { IconsModule } from "../shared/modules/icons/icons.module";
import { PlayerToolbarComponent } from "./player-toolbar/player-toolbar.component";
import { GameComponent } from "./game/game.component";
import { ActionComponent } from "./map/action/action.component";
import { ViewComponent } from "./map/view/view.component";
import { RankComponent } from './rank/rank.component';

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
  MatInputModule,
];

@NgModule({
  declarations: [
    PlayerComponent,
    ProfilComponent,
    MapComponent,
    GameComponent,
    CharacterComponent,
    CreateComponent,
    PlayerToolbarComponent,
    ActionComponent,
    ViewComponent,
    RankComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlayerRouting,
    FlexModule,
    FlexLayoutModule,
    MATERIALS,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatListModule,
    ExtendedModule,
    IconsModule,
    WorldViewverModule,
  ],
  providers: [],
})
export class PlayerModule {}
