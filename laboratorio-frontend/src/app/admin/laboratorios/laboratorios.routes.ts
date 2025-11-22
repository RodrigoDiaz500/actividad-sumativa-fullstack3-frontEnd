import { Routes } from '@angular/router';
import { LaboratoriosListComponent } from './laboratorios-list/laboratorios-list.component';
import { LaboratorioFormComponent } from './laboratorio-form/laboratorio-form.component';

export const LABORATORIOS_ROUTES: Routes = [
  { path: '', component: LaboratoriosListComponent }, // /admin/laboratorios
  { path: 'nuevo', component: LaboratorioFormComponent }, // /admin/laboratorios/nuevo
  // La ruta de edición usa un parámetro 'id'
  { path: 'editar/:id', component: LaboratorioFormComponent } // /admin/laboratorios/editar/1
];