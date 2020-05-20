import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from './services/user.service';
import {BackService} from './services/back.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './account/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameComponent } from './game/game.component';
import { MapComponent } from './game/player/map/map.component';
import { CharacterComponent } from './game/player/character/character.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import {LoginErrorPipePipe} from './account/LoginErrorPipe.pipe';
import {CreateAccountErrorPipe} from './account/CreateAccountError.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    MapComponent,
    CharacterComponent,
    CreateAccountComponent,
    LoginComponent,
    LoginComponent,
    LoginComponent,
    LoginErrorPipePipe,
    CreateAccountErrorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    UserService,
    BackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
