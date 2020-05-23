import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '../shared/services/user.service';
import {GameComponent} from './game.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {GameRouting} from './game.routing';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule,
    GameRouting
  ],
  providers: [
    UserService
  ]
})
export class GameModule { }
