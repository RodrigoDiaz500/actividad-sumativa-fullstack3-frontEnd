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
  }, // Redirige a la página de inicio de sesión por defecto
  
  {
    path: 'auth',
    // Carga perezosa del archivo de rutas de autenticación (contiene login, register, forgot-password)
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // ---------------------------------------------
  // RUTAS DE ADMINISTRACIÓN (PROTEGIDAS)
  // ---------------------------------------------
  {
    path: 'admin',
    // 2. Proteger esta ruta y todas sus hijas
    canActivate: [authGuard], 
    
    // Usamos LayoutComponent como contenedor (Sidebar + RouterOutlet)
    loadComponent: () => import('./admin/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      // admin/ (Dashboard)
      { 
        path: '', 
        loadComponent: () => import('./admin/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      
      // Lazy Loading para las rutas CRUD de cada entidad
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

  // ---------------------------------------------
  // RUTA WILDCARD (404 - Ruta no encontrada)
  // ---------------------------------------------
  { 
    path: '**', 
    redirectTo: 'auth/login' 
  }
];