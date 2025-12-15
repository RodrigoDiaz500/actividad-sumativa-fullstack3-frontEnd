import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosTablaComponent } from '../resultados-tabla/resultados-tabla.component'; 
// Importamos la tabla que es el componente que vamos a usar en este contenedor.

@Component({
  selector: 'app-resultados-container',
  standalone: true,
  // ¡CLAVE! Aseguramos que Angular reconozca el componente hijo.
  imports: [CommonModule, ResultadosTablaComponent], 
  templateUrl: './resultados-container.component.html',
  styleUrls: ['./resultados-container.component.scss']
})
export class ResultadosContainerComponent implements OnInit {

  // Como la tabla está simulando sus propios datos y rol,
  // estas propiedades ya no son necesarias en el contenedor.
  // Si tuvieras un servicio que trajera datos reales, las usarías aquí.
  // public resultados: any[] = [];
  // public rolActual: string = '';

  constructor() { }

  ngOnInit(): void {
    // Si tuvieras que llamar a un servicio para cargar datos, sería aquí.
    // Ejemplo: this.servicioResultados.obtenerResultados().subscribe(data => this.resultados = data);
  }
}