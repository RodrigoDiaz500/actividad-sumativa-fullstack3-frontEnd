import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-examen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-examen.component.html',
  styleUrls: ['./registro-examen.component.scss']
})
export class RegistroExamenComponent implements OnInit {
  
  public examenForm: FormGroup;
  public submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.examenForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.examenForm = this.fb.group({
      pacienteNombre: ['', Validators.required],
      pacienteRut: ['', [Validators.required, Validators.pattern(/^[0-9]{7,8}-[0-9Kk]$/)]],
      tipoAnalisis: ['', Validators.required],
      laboratorio: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      estado: ['Pendiente', Validators.required], // Valor por defecto
      observaciones: ['', Validators.maxLength(250)]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.examenForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.examenForm.valid) {
      console.log('Examen registrado (Simulado). Datos:', this.examenForm.value);
      alert('Examen registrado exitosamente y enviado al laboratorio (Simulado).');
      this.examenForm.reset({ estado: 'Pendiente' });
      this.submitted = false;
    } else {
      this.examenForm.markAllAsTouched();
      alert('Por favor, corrige los errores del formulario.');
    }
  }
}