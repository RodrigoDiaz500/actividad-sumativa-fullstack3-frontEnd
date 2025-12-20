import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('RecuperarContrasenaComponent', () => {
  let component: RecuperarContrasenaComponent;
  let fixture: ComponentFixture<RecuperarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarContrasenaComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]) 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe marcar el formulario como inválido si el email no es correcto', () => {
    component.recoveryForm.setValue({ email: 'email-malo' });
    expect(component.recoveryForm.valid).toBe(false);
  });

  it('debe llamar a alert al enviar email válido', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    component.recoveryForm.setValue({ email: 'test@test.com' });
    component.onSubmit();
    expect(alertSpy).toHaveBeenCalled();
  });
});