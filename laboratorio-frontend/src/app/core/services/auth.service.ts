import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.service'; 


interface LoginCredentials {
  email: string;
  password: string;
}


interface AuthResponse {
  token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; 
  private loginUrl = `${this.apiUrl}/auth/login`; 
  private registerUrl = `${this.apiUrl}/usuarios`; 

  constructor(private http: HttpClient) { }

  
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credentials);
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.registerUrl, usuario);
  }

  
  forgotPassword(email: string): Observable<any> {
    
    const resetUrl = `${this.apiUrl}/auth/forgot-password`;
    return this.http.post(resetUrl, { email });
  }


  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }


  logout(): void {
    localStorage.removeItem('auth_token');
  }
}