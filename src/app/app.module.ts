import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {UserService} from './shared/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule } from '@angular/flex-layout';
import {GameModule} from './game/game.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopbarComponent } from './shared/components/topbar/topbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GameModule,
    FlexLayoutModule,
    MatToolbarModule
  ],
  providers: [
    UserService
  ],
  exports: [
    TopbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
