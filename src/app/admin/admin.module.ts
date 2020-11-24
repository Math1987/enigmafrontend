import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminRouting} from './admin.routing';

/**
 * This module is loaded from player module if connected.
 * Usable only if user have admin rights
 */
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRouting
  ]
})
export class AdminModule { }
