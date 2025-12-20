import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  perfilForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getLoggedInUser();

    if (!currentUser) {
      alert('Debes iniciar sesión');
      return;
    }

    this.perfilForm = this.fb.group({
      nombre: [currentUser.nombre, [Validators.required, Validators.maxLength(50)]],
      apellido: [currentUser.apellido, [Validators.required, Validators.maxLength(50)]],
      email: [{ value: currentUser.email, disabled: true }],
      telefono: [currentUser.telefono, [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      rol: [{ value: currentUser.rol, disabled: true }]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.perfilForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const dataToUpdate = this.perfilForm.getRawValue();

    this.authService.updateProfile(dataToUpdate).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente');
        this.perfilForm.markAsPristine();
      },
      error: () => {
        alert('Error al actualizar el perfil');
      }
    });
  }
}
