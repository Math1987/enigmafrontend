import {Route, RouterModule} from '@angular/router';
import { MainComponent } from './main.component';

/**
 * Connection component is lazy loaded and got no specific route below
 * User AdminGuard to check if user has rights
 */
const MAIN_ROUTES: Route[] = [
  {
      path: '', component: MainComponent
    }
];

export const MainRouting = RouterModule.forChild(MAIN_ROUTES);
