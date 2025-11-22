import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.service'; // Reutilizamos la interfaz Usuario

// Interfaz para el login
interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para la respuesta del backend (asume que devuelve un token)
interface AuthResponse {
  token: string;
  // Otros datos del usuario, si es necesario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // Base URL de tu Spring Boot
  private loginUrl = `${this.apiUrl}/auth/login`; // Asume un endpoint de login
  private registerUrl = `${this.apiUrl}/usuarios`; // Usa el endpoint de creación de Usuario

  constructor(private http: HttpClient) { }

  // 1. LOGIN: Llama al endpoint de autenticación y maneja el token
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Nota: Debes crear el endpoint /api/auth/login en tu Spring Boot (AuthContoller)
    return this.http.post<AuthResponse>(this.loginUrl, credentials);
  }

  // 2. REGISTRO: Llama al endpoint de creación de usuario
  register(usuario: Usuario): Observable<Usuario> {
    // Esto llama al POST /api/usuarios en tu UsuarioController
    // Importante: El backend (UsuarioService) es el responsable de hashear la contraseña
    return this.http.post<Usuario>(this.registerUrl, usuario);
  }

  // 3. RECUPERAR CONTRASEÑA: Llama al endpoint de recuperación (aún no implementado en el backend)
  forgotPassword(email: string): Observable<any> {
    // Asume un endpoint para enviar el email de reseteo (ej. /api/auth/forgot-password)
    const resetUrl = `${this.apiUrl}/auth/forgot-password`;
    return this.http.post(resetUrl, { email });
  }

  // Método para guardar el token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}