import {Route, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';

/**
 * Connection component is lazy loaded and got no specific route below
 */
const ACCOUNT_ROUTES: Route[] = [
  {path: '', component: ConnectionComponent}
];

export const ConnectionRouting = RouterModule.forChild(ACCOUNT_ROUTES);
