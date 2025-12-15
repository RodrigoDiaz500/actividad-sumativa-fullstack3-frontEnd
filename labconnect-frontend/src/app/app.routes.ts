import { Routes } from '@angular/router';
import { RegistroComponent } from './auth/registro/registro.component'; 
import { LoginComponent } from './auth/login/login.component';
import { RecuperarContrasenaComponent } from './auth/recuperar-contrasena/recuperar-contrasena.component';
import { PerfilComponent } from './auth/perfil/perfil.component'; 
import { ResultadosContainerComponent } from './resultados/resultados-container/resultados-container.component'; 
import { RegistroExamenComponent } from './examenes/registro-examen/registro-examen.component'; // <-- NUEVO: Importar

export const routes: Routes = [
  // AUTENTICACIÓN
  { path: 'login', component: LoginComponent, title: 'Inicio de Sesión' },
  { path: 'registro', component: RegistroComponent, title: 'Registro de Usuarios' },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent, title: 'Recuperar Contraseña' },

  // FUNCIONALIDAD
  { path: 'resultados', component: ResultadosContainerComponent, title: 'Consulta de Resultados' },
  { path: 'perfil', component: PerfilComponent, title: 'Modificar Perfil' },
  { path: 'registro-examen', component: RegistroExamenComponent, title: 'Registrar Examen' }, // <-- NUEVA RUTA

  // RUTA POR DEFECTO
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];