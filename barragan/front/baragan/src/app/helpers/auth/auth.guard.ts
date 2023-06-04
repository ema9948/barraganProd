import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(LoginService);
  const rout = inject(Router);
  if (service.getToken()) {
    return true;
  }
  rout.navigate(['/login']);
  return false;
};
