import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroExamenComponent } from './registro-examen.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultadosService } from '../../resultados/resultados-tabla/resultados.service';
import { AuthService } from '../../auth/auth.service';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('RegistroExamenComponent', () => {
  let component: RegistroExamenComponent;
  let fixture: ComponentFixture<RegistroExamenComponent>;
  let httpMock: HttpTestingController;
  let resultadosService: ResultadosService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroExamenComponent, 
        HttpClientTestingModule, 
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroExamenComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    resultadosService = TestBed.inject(ResultadosService);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:8081/laboratorios');
    req.flush([{ id: 1, nombre: 'Lab Central' }]);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar el RUT con el patrón correcto', () => {
    const rut = component.examenForm.get('pacienteRut');
    
    rut?.setValue('123'); 
    expect(rut?.valid).toBe(false);

    rut?.setValue('12345678-9'); 
    expect(rut?.valid).toBe(true);
  });

  it('debe registrar el examen exitosamente cuando el formulario es válido', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
   
    vi.spyOn(authService, 'getLoggedInUser').mockReturnValue({ id: 1, nombre: 'Admin' } as any);
    
    
    vi.spyOn(resultadosService, 'registrarExamen').mockReturnValue(of({} as any));

    
    component.examenForm.patchValue({
      pacienteNombre: 'Juan Perez',
      pacienteRut: '12345678-9',
      tipoAnalisis: 'Hemograma Completo',
      laboratorio: '1',
      fechaSolicitud: '2026-01-01', 
      observaciones: 'Sin observaciones'
    });

    component.onSubmit();

    expect(resultadosService.registrarExamen).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Examen registrado correctamente');
    
    alertSpy.mockRestore();
  });

  it('debe mostrar alerta de error si falla el registro', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(authService, 'getLoggedInUser').mockReturnValue({ id: 1 } as any);
    vi.spyOn(resultadosService, 'registrarExamen').mockReturnValue(throwError(() => new Error('Err')));

    component.examenForm.patchValue({
      pacienteNombre: 'Test',
      pacienteRut: '12345678-9',
      tipoAnalisis: 'Perfil Lipídico',
      laboratorio: '1',
      fechaSolicitud: '2026-01-01'
    });

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Error al registrar el examen');
    alertSpy.mockRestore();
  });
});