import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { AuthService } from '../../auth/auth.service'; 
import { NgClass } from '@angular/common'; // Necesario para [ngClass] en Angular 17+ Standalone

@Component({
  selector: 'app-resultados-tabla',
  standalone: true,
  // Aseguramos que NgClass esté en los imports para que funcione el estilo condicional del icono
  imports: [CommonModule, DatePipe, NgClass], 
  templateUrl: './resultados-tabla.component.html',
  styleUrls: ['./resultados-tabla.component.scss']
})
export class ResultadosTablaComponent implements OnInit {

  // DATOS SIMULADOS AMPLIADOS (para que el diseño se vea lleno)
  public resultados: any[] = [
    { id: 'ORD-1001', fecha: new Date('2025-10-01'), tipo: 'Hemograma Completo', tercero: 'Dr. López', estado: 'Finalizado', pdfLink: '/reporte/1001' },
    { id: 'ORD-1002', fecha: new Date('2025-10-05'), tipo: 'Perfil Lipídico', tercero: 'Sra. García', estado: 'En Progreso', pdfLink: null },
    { id: 'ORD-1003', fecha: new Date('2025-10-10'), tipo: 'Glucosa en Ayunas', tercero: 'Dr. Pérez', estado: 'Finalizado', pdfLink: '/reporte/1003' },
    { id: 'ORD-1004', fecha: new Date('2025-10-15'), tipo: 'Examen de Orina', tercero: 'Sr. Díaz', estado: 'Pendiente', pdfLink: null },
    { id: 'ORD-1005', fecha: new Date('2025-10-20'), tipo: 'Tiroides (TSH)', tercero: 'Dr. López', estado: 'Finalizado', pdfLink: '/reporte/1005' },
    { id: 'ORD-1006', fecha: new Date('2025-10-22'), tipo: 'Cultivo Bacteriano', tercero: 'Sra. Soto', estado: 'En Progreso', pdfLink: null },
    { id: 'ORD-1007', fecha: new Date('2025-11-01'), tipo: 'Panel Hepático', tercero: 'Sr. Martínez', estado: 'Finalizado', pdfLink: '/reporte/1007' },
    { id: 'ORD-1008', fecha: new Date('2025-11-05'), tipo: 'Cultura de Sangre', tercero: 'Dra. Rojas', estado: 'Pendiente', pdfLink: null },
    { id: 'ORD-1009', fecha: new Date('2025-11-12'), tipo: 'PCR', tercero: 'Sr. Fernández', estado: 'Finalizado', pdfLink: '/reporte/1009' },
    { id: 'ORD-1010', fecha: new Date('2025-11-18'), tipo: 'Vitaminas B12/D', tercero: 'Sra. Gómez', estado: 'Cancelado', pdfLink: null },
    { id: 'ORD-1011', fecha: new Date('2025-12-01'), tipo: 'Análisis de Gases', tercero: 'Dr. Vera', estado: 'En Progreso', pdfLink: null },
    { id: 'ORD-1012', fecha: new Date('2025-12-10'), tipo: 'Perfil Renal', tercero: 'Sr. Rivas', estado: 'Pendiente', pdfLink: null },
  ];

  // El rol se obtiene internamente para esta simulación
  public userRole: 'ADMIN' | 'LAB' | 'PATIENT' | null = null;
  
  @Input() filtro: string = ''; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtenemos el rol del usuario logueado (asumiendo que AuthService existe y tiene getLoggedInUser)
    // Usaremos un valor por defecto si no lo encuentra, por ejemplo 'ADMIN' para ver los botones de edición.
    this.userRole = this.authService.getLoggedInUser()?.rol || 'ADMIN'; 
  }

  /**
   * Asigna una clase de Bootstrap (color) a los badges basados en el estado.
   * CORRECCIÓN: Usamos consistentemente 'En Progreso'.
   */
  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Finalizado':
        return 'bg-success'; 
      case 'En Progreso':
        return 'bg-warning text-dark'; 
      case 'Pendiente':
        return 'bg-info'; 
      case 'Cancelado':
        return 'bg-danger'; 
      default:
        return 'bg-secondary';
    }
  }

  /**
   * Simula la acción de ver el detalle o reporte.
   */
  verDetalle(resultado: any): void {
    if (resultado.estado === 'Finalizado' && resultado.pdfLink) {
      alert(`Simulación: Abriendo reporte PDF para ID ${resultado.id}.`);
    } else {
      alert(`El examen ID ${resultado.id} aún no está finalizado. Estado actual: ${resultado.estado}.`);
    }
  }
}