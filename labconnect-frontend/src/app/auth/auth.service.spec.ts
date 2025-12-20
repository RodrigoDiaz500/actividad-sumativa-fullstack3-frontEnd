import { TestBed } from '@angular/core/testing';
import { AuthService, AuthResponse } from './auth.service'; 
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const routerMock = {
    navigate: vi.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe iniciar sesión con éxito', () => {
    const mockResponse: AuthResponse = {
      success: true,
      message: 'Login exitoso',
      user: {
        id: 1, 
        nombre: 'Admin',
        apellido: 'Lab',
        email: 'admin@lab.cl',
        rol: 'ADMIN',
        telefono: '12345678',
        password: 'Password123!'
      }
    };

    service.login('admin@lab.cl', 'Password123!').subscribe(res => {
      expect(res.success).toBe(true);
      expect(res.user?.email).toBe('admin@lab.cl');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debe fallar con credenciales incorrectas', () => {
    const mockResponse: AuthResponse = {
      success: false,
      message: 'Credenciales inválidas'
    };

    service.login('error@test.com', 'wrong').subscribe(res => {
      expect(res.success).toBe(false);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    req.flush(mockResponse);
  });

  it('debe cerrar sesión y navegar al login', () => {
    localStorage.setItem('user', JSON.stringify({ nombre: 'Test' }));
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('isLoggedIn debe funcionar correctamente', () => {
    localStorage.clear();
    (service as any).userSubject.next(null);
    expect(service.isLoggedIn()).toBe(false);
    localStorage.setItem('user', JSON.stringify({ nombre: 'Test' }));
    expect(service.isLoggedIn()).toBe(true);
  });

  
});