import { Routes } from '@angular/router';
import { ResultadosListComponent } from './resultados-list/resultados-list.component';
import { ResultadoFormComponent } from './resultado-form/resultado-form.component';

export const RESULTADOS_ROUTES: Routes = [
  { path: '', component: ResultadosListComponent }, 
  { path: 'nuevo', component: ResultadoFormComponent }, 
  { path: 'editar/:id', component: ResultadoFormComponent }
];