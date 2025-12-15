import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // <-- Router importado
import { AuthService } from '../auth.service'; // <-- AuthService importado
import { User } from './user.model'; // <-- User model importado

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink 
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public registroForm: FormGroup;
  private readonly passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,20}$/;
  public submitted: boolean = false; // Variable de control para el envío

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService // Inyección
  ) { 
    this.registroForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]], 
      password: ['', [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(20), 
        Validators.pattern(this.passwordPattern)
      ]],
      confirmPassword: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]] // Agregado campo telefono
    }, {
      validators: this.passwordMatchValidator 
    });
  }

  private passwordMatchValidator(form: AbstractControl) {
    // ... (Lógica de validación de coincidencia de contraseña) ...
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');
    
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } 
    
    if (confirmPasswordControl && confirmPasswordControl.hasError('passwordMismatch')) {
      const errors = confirmPasswordControl.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPasswordControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    }
    return null;
  }

  isInvalid(field: string): boolean {
    const control = this.registroForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registroForm.valid) {
      // Casteamos el valor del formulario al modelo de User
      const newUser: User = this.registroForm.value as User;
      
      this.authService.registrarUsuario(newUser).subscribe(
        response => {
          if (response.success) {
            alert(response.message);
            // Redirigir al login después del registro exitoso
            this.router.navigate(['/login']); 
          } else {
            alert(response.message);
          }
        },
        () => {
          alert('Ocurrió un error inesperado durante el registro.');
        }
      );
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

}