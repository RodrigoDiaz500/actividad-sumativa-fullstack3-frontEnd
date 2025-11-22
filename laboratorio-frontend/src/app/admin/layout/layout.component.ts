import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes

@Component({
  selector: 'app-layout',
  standalone: true,
  // Añade las directivas de ruteo al array de imports
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuItems = [
    { name: 'Dashboard', route: '/admin', icon: '🏠' },
    { name: 'Usuarios', route: '/admin/usuarios', icon: '👤' },
    { name: 'Laboratorios', route: '/admin/laboratorios', icon: '🔬' },
    { name: 'Análisis', route: '/admin/analisis', icon: '🧪' },
    { name: 'Resultados', route: '/admin/resultados', icon: '📈' },
  ];
}