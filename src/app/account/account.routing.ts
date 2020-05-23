import {Route, RouterModule} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {AccountConnectionComponent} from './account.connection/account.connection.component';

const ACCOUNT_ROUTES: Route[] = [
  {path: '', component: AccountConnectionComponent}
];

export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
