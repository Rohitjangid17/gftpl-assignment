import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    data: { prerender: false }
  },
];
