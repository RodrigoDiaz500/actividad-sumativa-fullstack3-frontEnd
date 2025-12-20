import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service'; 
import { User } from './user.model'; 

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
  public submitted: boolean = false; 

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService 
  ) { 
    this.registroForm = this.fb.group({});
  }

  ngOnInit(): void {
  this.registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['PATIENT', [Validators.required]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(this.passwordPattern)
    ]],
    confirmPassword: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]]
  }, {
    validators: this.passwordMatchValidator
  });
}

  private passwordMatchValidator(form: AbstractControl) {
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

  if (this.registroForm.invalid) {
    this.registroForm.markAllAsTouched();
    return;
  }

  const formValue = this.registroForm.value;


  const newUser: User = {
    nombre: formValue.nombre,
    apellido: formValue.apellido,
    email: formValue.email,
    password: formValue.password,
    rol: formValue.rol,
    telefono: formValue.telefono
  };

  this.authService.registrarUsuario(newUser).subscribe({
    next: () => {
      alert('Usuario registrado correctamente');
      this.router.navigate(['/login']);
    },
    error: () => {
      alert('Error al registrar usuario');
    }
  });
}

}