import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();

  // If trying to access login while logged in → redirect to /parties
  if (state.url.startsWith('/login') && isLoggedIn) {
    return router.parseUrl('/parties');
  }

  // If trying to access protected routes while not logged in → redirect to /login
  if (!state.url.startsWith('/login') && !isLoggedIn) {
    return router.parseUrl('/login');
  }

  return true;
};
