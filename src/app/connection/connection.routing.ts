import {Route, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';

const ACCOUNT_ROUTES: Route[] = [
  {path: '', component: ConnectionComponent}
];

export const ConnectionRouting = RouterModule.forChild(ACCOUNT_ROUTES);
