export interface Usuario {
  idUsuario?: number; 
  nombre: string;
  email: string;
  passwordHash: string; 
  idRol: number;
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }


}