import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Utilisation correcte du signal
  if (!authService.isLoggedIn$()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
