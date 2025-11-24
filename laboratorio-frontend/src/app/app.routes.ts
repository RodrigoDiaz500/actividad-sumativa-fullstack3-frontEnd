import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const ROUTES: Routes = [
  // ---------------------------------------------
  // RUTAS DE AUTENTICACIÓN (Login, Register, Forgot Password)
  // ---------------------------------------------
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // ---------------------------------------------
  // RUTAS DE ADMINISTRACIÓN (PROTEGIDAS)
  // ---------------------------------------------
  {
    path: 'admin',
    canActivate: [authGuard], 
    
    loadComponent: () => import('./admin/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./admin/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      
      {
        path: 'usuarios',
        loadChildren: () => import('./admin/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
      },
      {
        path: 'laboratorios',
        loadChildren: () => import('./admin/laboratorios/laboratorios.routes').then(m => m.LABORATORIOS_ROUTES)
      },
      {
        path: 'analisis',
        loadChildren: () => import('./admin/analisis/analisis.routes').then(m => m.ANALISIS_ROUTES)
      },
      {
        path: 'resultados',
        loadChildren: () => import('./admin/resultados/resultados.routes').then(m => m.RESULTADOS_ROUTES)
      },
    ]
  },

  { 
    path: '**', 
    redirectTo: 'auth/login' 
  }
];