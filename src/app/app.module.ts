import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { AnimationService } from "./shared/services/animation.service";
import { ReversePipe } from './shared/pipes/reverse.pipe';

/**
 * Main app component import and provide necessary systems for all modules.
 * All the modules will be load as lazy loading (see app-routing.module)
 */
@NgModule({
  declarations: [AppComponent, ReversePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AnimationService,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
