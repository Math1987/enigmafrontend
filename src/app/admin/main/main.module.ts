import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouting } from './main.routing';
import { MainComponent } from './main.component';
import { AdminWorldComponent } from './admin-world/admin-world.component';
import { UsersComponent } from './users/users.component';
import { WorldViewverModule } from 'src/app/shared/modules/world-viewver/world-viewver.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    AdminWorldComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MainRouting,
    WorldViewverModule,
    SharedModule
  ]
})
export class MainModule { }
