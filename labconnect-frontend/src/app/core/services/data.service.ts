import { Injectable } from '@angular/core';


export interface ResultadoAnalisis {
  id: number;
  paciente: string;
  analisis: string;
  laboratorio: string;
  fecha: Date;
  estado: 'Pendiente' | 'En Proceso' | 'Finalizado';
  resultadoUrl: string; 
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Colección de Resultados de Análisis Simulado 
  private resultados: ResultadoAnalisis[] = [
    { id: 101, paciente: 'Ana Gómez', analisis: 'Hemograma Completo', laboratorio: 'Lab Central', fecha: new Date('2025-11-20'), estado: 'Finalizado', resultadoUrl: '/reporte/101' },
    { id: 102, paciente: 'Carlos Díaz', analisis: 'Glucosa en Ayunas', laboratorio: 'Clínica Norte', fecha: new Date('2025-12-01'), estado: 'En Proceso', resultadoUrl: '' },
    { id: 103, paciente: 'Laura Pérez', analisis: 'Perfil Lipídico', laboratorio: 'Lab Central', fecha: new Date('2025-12-10'), estado: 'Finalizado', resultadoUrl: '/reporte/103' },
    { id: 104, paciente: 'Mario Soto', analisis: 'Electrocardiograma', laboratorio: 'Hospital Sur', fecha: new Date('2025-12-14'), estado: 'Pendiente', resultadoUrl: '' },
    { id: 105, paciente: 'Elena Ríos', analisis: 'Examen de Orina', laboratorio: 'Lab Central', fecha: new Date('2025-12-05'), estado: 'Finalizado', resultadoUrl: '/reporte/105' },
    { id: 106, paciente: 'David Mora', analisis: 'Cultivo Bacteriano', laboratorio: 'Hospital Sur', fecha: new Date('2025-12-15'), estado: 'En Proceso', resultadoUrl: '' },
  ];

  constructor() { }

  /**
   * Obtiene la lista/colección completa de resultados.
   * @returns Array<ResultadoAnalisis>
   */
  getResultados(): ResultadoAnalisis[] {
    return [...this.resultados]; // Retorna una copia de la colección
  }
}