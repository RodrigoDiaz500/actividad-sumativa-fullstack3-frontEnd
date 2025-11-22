import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté aquí

@Component({
  selector: 'app-analisis-list',
  standalone: true,
  imports: [CommonModule], // Importante para usar *ngIf, *ngFor
  templateUrl: './analisis-list.component.html',
  styleUrl: './analisis-list.component.css'
})
// ¡La palabra 'export' es OBLIGATORIA aquí!
export class AnalisisListComponent { 
  // ... tu código
}