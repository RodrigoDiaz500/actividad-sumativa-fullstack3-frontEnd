import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from '../laboratorios/laboratorio.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  private baseUrl = 'http://localhost:8081/laboratorios'; 
  

  constructor(private http: HttpClient) {}

  listar(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.baseUrl);
  }

  crear(lab: Laboratorio): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.baseUrl, lab);
  }

  actualizar(id: number, lab: Laboratorio): Observable<Laboratorio> {
    return this.http.put<Laboratorio>(`${this.baseUrl}/${id}`, lab);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
