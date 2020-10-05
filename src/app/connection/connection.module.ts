import { PlayerConfirmComponent } from './signup/player-confirm/player-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ConnectionRouting} from './connection.routing';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ConnectionComponent} from './connection.component';
import {InputMailPipe} from '../shared/pipes/inputMail.pipe';
import {ExtendedModule, FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';

/**
 * Connection module is lazy loded if called from base route or if player's token invalid
 * Manage the form for signin or signup
 */
@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    InputMailPipe,
    ConnectionComponent,
    PlayerConfirmComponent,
    ReinitPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ConnectionRouting,
    FlexModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    ExtendedModule
  ],
  providers: []
})
export class ConnectionModule { }
