import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userName: string = '';
  public userRole: string = ''; 
  public showNavbar: boolean = false; // Controla el *ngIf
  
  // Enlaces básicos disponibles para todos los usuarios logueados
  private baseLinks = [
    { label: 'Resultados', path: '/resultados' },
    { label: 'Mi Perfil', path: '/perfil' },
    { label: 'Registrar Examen', path: '/registro-examen' }

  ];
  public navLinks: { label: string, path: string }[] = [...this.baseLinks];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 🚨 INYECCIÓN CLAVE: Para forzar la actualización de la vista
  ) { }

  ngOnInit(): void {
    // 1. Escuchar eventos de navegación (Crucial para actualizar después del login)
    this.router.events.subscribe(() => {
        this.loadUserData();
        // 🚨 Forzar la detección de cambios para actualizar el *ngIf="showNavbar" inmediatamente
        this.cdr.detectChanges(); 
    });
    
    // 2. Llamada inicial para cargar el estado si la página se cargó directamente
    this.loadUserData();
    this.cdr.detectChanges();
  }
  
  /**
   * Carga los datos del usuario logueado (desde localStorage vía AuthService)
   * y ajusta la visibilidad y los enlaces.
   */
  loadUserData(): void {
    const user = this.authService.getLoggedInUser(); 
    const currentPath = this.router.url;
    
    const authPaths = ['/login', '/registro', '/recuperar-contrasena'];

    // Condición de visibilidad: El usuario debe existir Y NO estar en una ruta de autenticación
    const shouldShow = user && !authPaths.some(path => currentPath.startsWith(path));

    if (shouldShow) { 
        this.showNavbar = true; 
        
        // 1. Asignación de Nombre
        const nombre = user.nombre || 'Usuario';
        const apellido = user.apellido || '';
        this.userName = `${nombre} ${apellido}`.trim();

        // 2. Asignación de Rol
        this.userRole = user.rol ? user.rol.toUpperCase() : 'INVITADO'; 
        
        // 3. Ajustar enlaces
        this.updateNavLinks(user.rol || 'PATIENT'); 
        
    } else {
        // Ocultar si está en login o no hay usuario
        this.showNavbar = false; 
        
        // Limpieza de datos
        this.userName = '';
        this.userRole = '';
        this.navLinks = [...this.baseLinks];
    }
  }

  /**
   * Actualiza los enlaces de navegación insertando 'Registrar Examen' si es ADMIN o LAB.
   */
  updateNavLinks(role: string): void {
     this.navLinks = [...this.baseLinks]; 
     
     if (role.toUpperCase() === 'ADMIN' || role.toUpperCase() === 'LAB') {
       const registrationLink = { label: 'Registrar Examen', path: '/registro-examen' };
       const hasLink = this.navLinks.some(link => link.path === registrationLink.path);
       
       if (!hasLink) {
             this.navLinks.splice(1, 0, registrationLink);
       }
     }
  }

  /**
   * Cierra la sesión y redirige.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}