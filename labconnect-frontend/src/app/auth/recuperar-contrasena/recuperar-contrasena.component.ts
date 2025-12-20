import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterLink 
  ],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  public recoveryForm: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder) {
    this.recoveryForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.recoveryForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.recoveryForm.valid) {
      console.log('Solicitud de recuperación para:', this.recoveryForm.value.email);
      alert(`Se ha enviado un correo de recuperación a ${this.recoveryForm.value.email} (Proceso Simulado).`);
      this.recoveryForm.reset();
      this.submitted = false;
    } else {
      this.recoveryForm.markAllAsTouched();
    }
  }

}