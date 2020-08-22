import { ConfirmGuard } from "./shared/guards/confirm.guard";
import { PlayerConfirmComponent } from "./connection/signup/player-confirm/player-confirm.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "connexion",
    loadChildren: () =>
      import("./connection/connection.module").then((m) => m.ConnectionModule),
  },
  {
    path: "u",
    loadChildren: () =>
      import("./player/player.module").then((m) => m.PlayerModule),
  },

  {
    path: "confirmer",
    component: PlayerConfirmComponent,
    canActivate: [ConfirmGuard],
  },

  { path: "", redirectTo: "connexion", pathMatch: "full" },
  { path: "*", redirectTo: "connexion", pathMatch: "full" },
  { path: "**", redirectTo: "connexion", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
