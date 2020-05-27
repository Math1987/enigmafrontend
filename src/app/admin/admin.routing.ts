import {Route, RouterModule} from '@angular/router';
import {ConnectionComponent} from './connection.component';
import {AdminComponent} from './admin.component';
import {AdminGuard} from '../shared/guards/admin.guard';

/**
 * Connection component is lazy loaded and got no specific route below
 * User AdminGuard to check if user has rights
 */
const ACCOUNT_ROUTES: Route[] = [
  {path: '', component: AdminComponent, canActivate: [AdminGuard]}
];

export const AdminRouting = RouterModule.forChild(ACCOUNT_ROUTES);
