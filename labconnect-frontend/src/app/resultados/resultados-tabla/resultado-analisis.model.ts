export interface ResultadoAnalisis {
  idResultado?: number;
  tipoAnalisis: string;
  resultado?: string | null;
  fechaAnalisis: string; 
  estado: 'Pendiente' | 'En Progreso' | 'Finalizado';
  idLaboratorio: number;
  idUsuario: number;
}
