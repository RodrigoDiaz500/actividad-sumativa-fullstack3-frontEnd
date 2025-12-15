import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // <-- AuthService importado

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

  public perfilForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService // Inyección
  ) {
    this.perfilForm = this.fb.group({});
  }

  ngOnInit(): void {
    const currentUser = this.authService.getLoggedInUser();

    if (!currentUser) {
        alert("Debes iniciar sesión para ver tu perfil.");
        // Aquí podrías redirigir al login
        // this.router.navigate(['/login']);
        return;
    }
    
    // Definición e inicialización del formulario con los datos del usuario logueado
    this.perfilForm = this.fb.group({
      nombre: [currentUser.nombre, [Validators.required, Validators.maxLength(50)]],
      apellido: [currentUser.apellido, [Validators.required, Validators.maxLength(50)]],
      // Email y Rol se deshabilitan
      email: [{ value: currentUser.email, disabled: true }, [Validators.required, Validators.email]], 
      telefono: [currentUser.telefono, [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      rol: [{ value: currentUser.rol, disabled: true }] 
    });
  }

  isInvalid(field: string): boolean {
    const control = this.perfilForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      const dataToUpdate = this.perfilForm.getRawValue();
      
      console.log('Datos de perfil listos para actualizar (Simulado):', dataToUpdate);
      
      alert('Perfil actualizado exitosamente (Simulado).');
      this.perfilForm.markAsPristine(); 
    } else {
      this.perfilForm.markAllAsTouched();
      console.error('Formulario de perfil Inválido');
    }
  }

}