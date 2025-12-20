import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoAnalisis } from './resultado-analisis.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private baseUrl = 'http://localhost:8082/resultados';

  constructor(private http: HttpClient) {}

  registrarExamen(examen: ResultadoAnalisis): Observable<ResultadoAnalisis> {
    return this.http.post<ResultadoAnalisis>(this.baseUrl, examen);
  }

  getTodos(): Observable<ResultadoAnalisis[]> {
    return this.http.get<ResultadoAnalisis[]>(this.baseUrl);
  }

  getPorUsuario(idUsuario: number): Observable<ResultadoAnalisis[]> {
    return this.http.get<ResultadoAnalisis[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }
}
