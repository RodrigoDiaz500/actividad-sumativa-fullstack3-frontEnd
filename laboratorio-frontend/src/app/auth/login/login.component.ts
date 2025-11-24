import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;


      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.loading = false;
          

          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.loading = false;
          
          if (err.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
          } else {
            this.errorMessage = 'Error en el servidor. Inténtalo más tarde.';
          }
          console.error('Error de Login:', err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, introduce tu email y contraseña.';
      this.loginForm.markAllAsTouched();
    }
  }
}