import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './registro/user.model'; 
import { Router } from '@angular/router';

const USER_KEY = 'labconnect_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = []; 

  constructor(private router: Router) { 
    // Usuario por defecto para pruebas rápidas
    this.users.push({
      nombre: 'Admin',
      apellido: 'Local',
      email: 'admin@lab.cl',
      password: 'Password123!', 
      rol: 'ADMIN', 
      telefono: '912345678'
    }); 
  }

  registrarUsuario(newUser: User): Observable<{ success: boolean, message: string }> {
    const existingUser = this.users.find(u => u.email === newUser.email);
    if (existingUser) {
      return of({ success: false, message: 'El correo electrónico ya está registrado.' });
    }
    if (!newUser.rol) {
        newUser.rol = 'PATIENT';
    }
    this.users.push(newUser);
    return of({ success: true, message: 'Registro exitoso. Ya puedes iniciar sesión.' });
  }

  login(email: string, password: string): Observable<{ success: boolean, message: string }> {
  const user = this.users.find(u => u.email === email);

  if (user && user.password === password) {

    const userToStore = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol || 'PATIENT',
      telefono: user.telefono
    };

    localStorage.setItem(USER_KEY, JSON.stringify(userToStore));

    return of({ success: true, message: 'Inicio de sesión exitoso.' });
  }

  return of({ success: false, message: 'Credenciales inválidas.' });
}

  logout(): void {
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
    alert('Has cerrado sesión exitosamente.');
  }

  getLoggedInUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
        // Asegúrate de castear el resultado a User (sin la password)
        return JSON.parse(userJson) as User; 
    }
    return null;
  }

  getLoggedInUserName(): string {
    const user = this.getLoggedInUser();
    return user ? `${user.nombre} ${user.apellido || ''}`.trim() : 'Invitado';
  }
}