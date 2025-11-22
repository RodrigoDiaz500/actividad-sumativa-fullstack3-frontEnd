import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../core/services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  // ¡Importante! Añadir ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Importante: El ID del rol define qué tipo de usuario se registra.
      // Aquí, asumimos un rol por defecto (ej. 2 = Técnico o Usuario Normal)
      idRol: [2, Validators.required] 
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const { password, ...userData } = this.registerForm.value;
      
      const newUsuario: Usuario = {
        ...userData,
        // En tu backend, el campo es 'passwordHash'.
        // Aquí enviamos la contraseña sin hashear, el backend se encarga del hashing.
        passwordHash: password 
      };

      this.authService.register(newUsuario).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Serás redirigido al login.';
          // Redirige al login después de un breve retraso
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (err) => {
          // Manejo de errores (ej. Email ya existe)
          this.errorMessage = 'Error al registrar. El email ya está en uso o datos inválidos.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}