import {Route, RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {AdminGuard} from '../shared/guards/admin.guard';
import { MainComponent } from './main/main.component';

/**
 * Connection component is lazy loaded and got no specific route below
 * User AdminGuard to check if user has rights
 */
const ACCOUNT_ROUTES: Route[] = [
  {
    path: 'login', component: AdminComponent
  },
  {
    path : 'main',
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule)
  },
];

export const AdminRouting = RouterModule.forChild(ACCOUNT_ROUTES);
