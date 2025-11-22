import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // Verifica si existe el token (puedes añadir lógica de token expirado aquí)
  if (token) {
    return true; // Acceso permitido
  } else {
    // Acceso denegado, redirige al login
    router.navigate(['/auth/login']);
    return false;
  }
};