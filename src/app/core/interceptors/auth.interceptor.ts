import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // Clone the request to add the new header
  const authReq = token
    ? req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    })
    : req;

  // Send the cloned request with the authorization header
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.error?.detail === 'Invalid token.') {
        authService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
