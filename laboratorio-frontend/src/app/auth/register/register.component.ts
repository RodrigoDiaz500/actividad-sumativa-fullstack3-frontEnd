import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../core/services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
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
        passwordHash: password 
      };

      this.authService.register(newUsuario).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Serás redirigido al login.';
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar. El email ya está en uso o datos inválidos.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}