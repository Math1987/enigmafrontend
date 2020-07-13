import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    IconsComponent
  ]
})
export class IconsModule { }
