import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public userName: string = '';
  public userRole: string = ''; 
  public showNavbar: boolean = false; 
  public navLinks: { label: string, path: string }[] = [];

  private subs = new Subscription();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subs.add(this.authService.user$.subscribe(() => {
      this.refreshNavbar();
    }));

    this.subs.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.refreshNavbar();
    }));

    this.refreshNavbar();
  }

  refreshNavbar(): void {
  const user = this.authService.getLoggedInUser();
  const currentPath = this.router.url;


  const isLoginPage = currentPath === '/login' || currentPath.startsWith('/login?');
  const isRegisterUserPage = currentPath === '/registro' || currentPath.startsWith('/registro?');
  const isAuthPage = isLoginPage || isRegisterUserPage;
  this.showNavbar = !!user && !isAuthPage;

  if (this.showNavbar && user) {
    this.userName = `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim() || 'Usuario';
    this.userRole = user.rol?.toUpperCase() ?? 'PACIENTE';
    this.updateNavLinks(user.rol ?? 'PATIENT');
  }
  
  this.cdr.detectChanges();
}

  updateNavLinks(role: string): void {
    const roleUpper = role.toUpperCase();
    
    // Enlaces básicos para TODOS los logueados
    this.navLinks = [
      { label: 'Resultados', path: '/resultados' },
      { label: 'Mi Perfil', path: '/perfil' }
    ];

    
    if (['ADMIN', 'MEDIC', 'LAB', 'PATIENT'].includes(roleUpper)) {
      if (!this.navLinks.some(link => link.path === '/registro-examen')) {
        this.navLinks.push({ label: 'Registrar Examen', path: '/registro-examen' });
      }
    }


    if (roleUpper === 'ADMIN') {
      if (!this.navLinks.some(link => link.path === '/laboratorios')) {
        this.navLinks.push({ label: 'Laboratorios', path: '/laboratorios' });
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}