import { Routes } from '@angular/router';
import { PARTIES_ROUTES } from './modules/admin/parties/parties.routes';
import { AUTH_ROUTES } from './modules/auth/auth.routes';

export const appRoutes: Routes = [
  ...AUTH_ROUTES,
  ...PARTIES_ROUTES.map(route => ({
    ...route,
    children: route.children?.filter(
      child => child.path !== 'parties/update-party/:id'
    ),
  })),
];
