import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authServiceMock: any;
  const mockUser = {
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'juan@test.com',
    telefono: '12345678',
    rol: 'PATIENT'
  };

  beforeEach(async () => {
    authServiceMock = {
      getLoggedInUser: vi.fn().mockReturnValue(mockUser),
      updateProfile: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PerfilComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('debe inicializar el formulario con los datos del usuario logueado', () => {
    expect(component.perfilForm).toBeDefined();
    expect(component.perfilForm.get('nombre')?.value).toBe(mockUser.nombre);
    expect(component.perfilForm.get('email')?.value).toBe(mockUser.email);
  });

  it('debe mostrar alerta de éxito al actualizar correctamente', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    authServiceMock.updateProfile.mockReturnValue(of({}));

    component.onSubmit();

    expect(authServiceMock.updateProfile).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Perfil actualizado correctamente');
    alertSpy.mockRestore();
  });

  it('debe mostrar alerta de error si falla la actualización', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    authServiceMock.updateProfile.mockReturnValue(throwError(() => new Error('Error')));

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Error al actualizar el perfil');
    alertSpy.mockRestore();
  });

  it('no debe llamar al servicio si el formulario es inválido', () => {
    authServiceMock.updateProfile.mockClear();
    
    component.perfilForm.get('nombre')?.setValue('');
    
    component.onSubmit();

    expect(authServiceMock.updateProfile).not.toHaveBeenCalled();
  });

  it('debe manejar el caso donde no hay usuario logueado', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    authServiceMock.getLoggedInUser.mockReturnValue(null);
    
    
    component.ngOnInit();

    expect(alertSpy).toHaveBeenCalledWith('Debes iniciar sesión');
    alertSpy.mockRestore();
  });
});