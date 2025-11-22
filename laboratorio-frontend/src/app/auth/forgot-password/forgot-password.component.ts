import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  // ¡Importante! Añadir ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css' // Usaremos los estilos compartidos
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.message = null;
    this.errorMessage = null;

    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const email = this.forgotPasswordForm.value.email;

      // Llama al servicio para iniciar el proceso de recuperación en el backend
      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.loading = false;
          // Este mensaje se muestra asumiendo que el proceso fue exitoso, independientemente
          // de si el email existe o no (por seguridad)
          this.message = 'Si la dirección de email está registrada, recibirás un enlace de restablecimiento en breve.';
        },
        error: (err) => {
          this.loading = false;
          // Aunque el backend debería devolver 200/204 para no revelar emails válidos,
          // manejamos errores de conexión o del servidor aquí.
          this.errorMessage = 'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo.';
          console.error('Error en Forgot Password:', err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, introduce una dirección de email válida.';
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}