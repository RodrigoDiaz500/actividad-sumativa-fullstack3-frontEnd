// 1. Define la interfaz de tu modelo Usuario
export interface Usuario {
  idUsuario?: number; // Opcional para crear
  nombre: string;
  email: string;
  passwordHash: string; // Usado para el campo de contraseña sin hashear en el frontend
  idRol: number;
}

// 2. Crea la clase del servicio (aunque esté vacío por ahora)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Aquí irán los métodos CRUD (findAll, findById, create, update, delete)
  // Dejamos esto vacío por ahora, solo necesitamos la interfaz
}