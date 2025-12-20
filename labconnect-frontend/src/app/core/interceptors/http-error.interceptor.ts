import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let errorMessage = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor';
      }

      if (error.status === 401) {
        errorMessage = 'Sesión expirada o credenciales inválidas';
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        errorMessage = 'No tienes permisos para esta acción';
      }

      if (error.status >= 500) {
        errorMessage = 'Error interno del servidor';
      }

      console.error('HTTP Error:', error);

      return throwError(() => new Error(errorMessage));
    })
  );
};
