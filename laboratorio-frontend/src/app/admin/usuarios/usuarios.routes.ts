import { Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

export const USUARIOS_ROUTES: Routes = [
  { path: '', component: UsuariosListComponent }, 
  { path: 'nuevo', component: UsuarioFormComponent }, 
  { path: 'editar/:id', component: UsuarioFormComponent }
];