import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyFreePipe } from '../../pipes/key-free.pipe';



@NgModule({
  declarations: [
    KeyFreePipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    KeyFreePipe
  ]
})
export class SharedModule { }
