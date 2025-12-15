import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <--- ¡CORRECCIÓN EN LA RUTA Y NOMBRE!

bootstrapApplication(AppComponent, appConfig) // <--- ¡CORRECCIÓN EN EL NOMBRE!
  .catch((err) => console.error(err));