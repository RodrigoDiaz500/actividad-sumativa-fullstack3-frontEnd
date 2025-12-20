import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './registro/user.model';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private usuariosUrl = 'http://localhost:8080/api/usuarios';

  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    try {
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(res => {
        if (res && (res.user || res.id)) {
          const userData = res.user || res; 
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
          this.userSubject.next(userData);
          return { success: true, message: 'Login exitoso', user: userData };
        }
        return { success: false, message: res.message || 'Credenciales incorrectas' };
      }),
      catchError(err => {
        console.error('Error en el servidor:', err);
        return of({ success: false, message: 'Error de conexión o credenciales inválidas' });
      })
    );
  }

  registrarUsuario(user: User): Observable<User> {
    return this.http.post<User>(this.usuariosUrl, user);
  }

  updateProfile(updatedData: Partial<User>): Observable<User> {
    const currentUser = this.getLoggedInUser();
    if (!currentUser || !currentUser.id) throw new Error('Usuario no válido');
    const userToSend: User = { ...currentUser, ...updatedData };
    return this.http.put<User>(`${this.usuariosUrl}/${currentUser.id}`, userToSend).pipe(
      tap(updatedUser => {
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        this.userSubject.next(updatedUser);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getLoggedInUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value || !!localStorage.getItem(USER_KEY);
  }
}