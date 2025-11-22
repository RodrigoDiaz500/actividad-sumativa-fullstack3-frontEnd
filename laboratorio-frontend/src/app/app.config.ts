import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // <-- ¡Añade o confirma esto!

import { ROUTES } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    provideClientHydration(),
    provideHttpClient(), // Habilita el módulo HTTP
    // ... otros proveedores
  ]
};