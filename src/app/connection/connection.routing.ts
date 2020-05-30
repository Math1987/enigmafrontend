import {Route, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ConnexionGuard} from '../shared/guards/connexion.guard';

/**
 * Connection component is lazy loaded and got no specific route below
 */
const ACCOUNT_ROUTES: Route[] = [
  {path: '', component: ConnectionComponent, canActivate: [ConnexionGuard] }
];

export const ConnectionRouting = RouterModule.forChild(ACCOUNT_ROUTES);
