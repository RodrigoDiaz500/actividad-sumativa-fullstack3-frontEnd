import { Routes } from '@angular/router';
import { AnalisisListComponent } from './analisis-list/analisis-list.component';
import { AnalisisFormComponent } from './analisis-form/analisis-form.component';

export const ANALISIS_ROUTES: Routes = [
  { path: '', component: AnalisisListComponent }, 
  { path: 'nuevo', component: AnalisisFormComponent }, 
  { path: 'editar/:id', component: AnalisisFormComponent }
];