import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {path : 'connexion', loadChildren: () => import('./connection/connection.module').then(m => m.ConnectionModule)},
  {path : 'u', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) },
  {path: '', redirectTo: 'u', pathMatch: 'full' },
  {path: '*', redirectTo: 'u', pathMatch: 'full' },
  {path: '**', redirectTo: 'u', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
