import {Route, RouterModule} from '@angular/router';
import { AdminWorldComponent } from './admin-world/admin-world.component';
import { CalculsComponent } from './calculs/calculs.component';
import { MainComponent } from './main.component';
import { PatternsComponent } from './patterns/patterns.component';
import { UsersComponent } from './users/users.component';

/**
 * Connection component is lazy loaded and got no specific route below
 * User AdminGuard to check if user has rights
 */
const MAIN_ROUTES: Route[] = [
  {
      path: '', component: MainComponent, children: [

        {
          path : 'users',
          component : UsersComponent
        },
        {
          path : 'patterns',
          component : PatternsComponent
        },
        {
          path : 'calculs',
          component : CalculsComponent
        },
        {
          path : 'worlds',
          component : AdminWorldComponent
        }
      ]
    }
];

export const MainRouting = RouterModule.forChild(MAIN_ROUTES);
