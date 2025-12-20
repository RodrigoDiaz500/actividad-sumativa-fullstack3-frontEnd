import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados-tabla.component.html',
  styleUrls: ['./resultados-tabla.component.scss']
})
export class ResultadosTablaComponent {
  @Input() resultados: any[] = [];
  @Input() userRole: string = ''; 

  getBadgeClass(estado: string): string {
    return this.getEstadoClass(estado);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Finalizado':
        return 'bg-success';
      case 'Pendiente':
        return 'bg-warning';
      case 'En Proceso':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }
}