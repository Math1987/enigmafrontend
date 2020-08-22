import { ConfirmGuard } from "./../shared/guards/confirm.guard";
import { PlayerConfirmComponent } from "./signup/player-confirm/player-confirm.component";
import { Route, RouterModule } from "@angular/router";
import { ConnectionComponent } from "./connection.component";
import { ConnexionGuard } from "../shared/guards/connexion.guard";

/**
 * Connection component is lazy loaded and got no specific route below
 */
const ACCOUNT_ROUTES: Route[] = [
  {
    path: "u",
    component: ConnectionComponent,
    //  canActivate: [ConnexionGuard]
  },
  {
    path: "confirmer",
    component: PlayerConfirmComponent,
    // canActivate: [ConfirmGuard],
  },
  { path: "*", redirectTo: "u", pathMatch: "full" },
  { path: "**", redirectTo: "u", pathMatch: "full" },
];

export const ConnectionRouting = RouterModule.forChild(ACCOUNT_ROUTES);
