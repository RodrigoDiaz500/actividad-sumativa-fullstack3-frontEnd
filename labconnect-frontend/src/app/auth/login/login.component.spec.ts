import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthResponse } from '../auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../registro/user.model';
import { vi, describe, it, expect, beforeEach } from 'vitest'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  const mockFullUser: User = {
    id: 1,
    nombre: 'Test',
    apellido: 'Usuario',
    email: 'test@test.com',
    password: 'password123',
    rol: 'PATIENT',
    telefono: '123456789'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe marcar el formulario como inválido si está vacío', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('no debe llamar al servicio si el formulario es invalido', () => {
    const spy = vi.spyOn(authService, 'login');
    component.submitted = true;
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('debe llamar al servicio y navegar si el login es exitoso', async () => {
    const mockResponse: AuthResponse = { 
      success: true, 
      message: 'Login exitoso', 
      user: mockFullUser 
    };
    
    const loginSpy = vi.spyOn(authService, 'login').mockReturnValue(of(mockResponse));
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456');
    
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/resultados']);
  });

  it('debe mostrar alerta de error si el login falla', () => {
    const mockErrorResponse: AuthResponse = { 
      success: false, 
      message: 'Credenciales incorrectas' 
    };
    
    vi.spyOn(authService, 'login').mockReturnValue(of(mockErrorResponse));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.loginForm.controls['email'].setValue('wrong@test.com');
    component.loginForm.controls['password'].setValue('wrongpass');
    
    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Credenciales incorrectas');
  });
});