import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouting } from './main.routing';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRouting
  ]
})
export class MainModule { }
