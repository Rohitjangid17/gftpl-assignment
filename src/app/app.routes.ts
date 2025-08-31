import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth.routes';
import { PARTIES_ROUTES } from './modules/admin/parties/parties.routes';

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...PARTIES_ROUTES,
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
