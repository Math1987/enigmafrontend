import { HistoricModule } from './../shared/modules/historic/historic.module';
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
import { MapComponent } from "./game/map/map.component";
import { CharacterComponent } from "./game/character/character.component";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CreateComponent } from "./create/create.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { ProfilComponent } from "./profil/profil.component";
import { IconsModule } from "../shared/modules/icons/icons.module";
import { PlayerToolbarComponent } from "./game/player-toolbar/player-toolbar.component";
import { GameComponent } from "./game/game.component";
import { ActionComponent } from "./game/map/action/action.component";
import { ViewComponent } from "./game/map/view/view.component";
import { RankComponent } from "./game/rank/rank.component";
import { ViewPlayerComponent } from "./game/map/view-player/view-player.component";
import { TargetComponent } from './game/map/target/target.component';

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
  MatTableModule,
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
    ViewPlayerComponent,
    TargetComponent,
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
    HistoricModule
  ],
  providers: [],
})
export class PlayerModule {}
