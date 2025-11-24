import { Routes } from '@angular/router';
import { LaboratoriosListComponent } from './laboratorios-list/laboratorios-list.component';
import { LaboratorioFormComponent } from './laboratorio-form/laboratorio-form.component';

export const LABORATORIOS_ROUTES: Routes = [
  { path: '', component: LaboratoriosListComponent }, 
  { path: 'nuevo', component: LaboratorioFormComponent }, 
  { path: 'editar/:id', component: LaboratorioFormComponent } 
];