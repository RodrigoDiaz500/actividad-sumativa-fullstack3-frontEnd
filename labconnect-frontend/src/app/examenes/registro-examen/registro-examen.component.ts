import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ResultadosService } from '../../resultados/resultados-tabla/resultados.service';
import { LaboratoriosService } from '../../laboratorios/laboratorios.service';
import { Laboratorio } from '../../laboratorios/laboratorio.model';
import { AuthService } from '../../auth/auth.service';
import { ResultadoAnalisis } from '../../resultados/resultados-tabla/resultado-analisis.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-registro-examen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './registro-examen.component.html'
})
export class RegistroExamenComponent implements OnInit {

  examenForm!: FormGroup;
  laboratorios: Laboratorio[] = [];
  loadingLabs = true; 
  today: string = new Date().toISOString().split('T')[0];

  tiposAnalisis: string[] = [
    'Hemograma Completo',
    'Perfil Lipídico',
    'Glucosa en Ayunas',
    'Examen de Orina'
  ];

  constructor(
    private fb: FormBuilder,
    private resultadosService: ResultadosService,
    private laboratoriosService: LaboratoriosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // Inicializa el formulario
    this.examenForm = this.fb.group({
      pacienteNombre: ['', Validators.required],
      pacienteRut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[0-9Kk]$/)]],
      tipoAnalisis: ['', Validators.required],
      laboratorio: ['', Validators.required],
      fechaSolicitud: ['', [Validators.required, this.fechaNoPasada]],
      estado: [{ value: 'Pendiente', disabled: true }],
      observaciones: ['', Validators.maxLength(250)]
    });

    // Carga los laboratorios desde el backend
    this.laboratoriosService.listar().subscribe({
      next: (data) => {
        console.log('Laboratorios recibidos:', data); 
        this.laboratorios = data;
        this.loadingLabs = false;
      },
      error: (err) => {
        console.error('Error cargando laboratorios:', err);
        this.loadingLabs = false;
        alert('No se pudieron cargar los laboratorios.');
      }
    });
  }

  fechaNoPasada(control: AbstractControl) {
    if (!control.value) return null;
    const seleccionada = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return seleccionada < hoy ? { fechaPasada: true } : null;
  }

  isInvalid(controlName: string): boolean {
    const control = this.examenForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.examenForm.invalid || this.laboratorios.length === 0) return;

    const user = this.authService.getLoggedInUser();
    if (!user || user.id == null) {
      alert('Usuario no válido');
      return;
    }

    const examen: ResultadoAnalisis = {
      tipoAnalisis: this.examenForm.value.tipoAnalisis,
      fechaAnalisis: this.examenForm.value.fechaSolicitud,
      estado: 'Pendiente',
      idLaboratorio: Number(this.examenForm.value.laboratorio),
      idUsuario: user.id!,
      resultado: null
    };

    this.resultadosService.registrarExamen(examen).subscribe({
      next: () => {
        alert('Examen registrado correctamente');
        this.examenForm.reset({ estado: 'Pendiente' });
      },
      error: () => alert('Error al registrar el examen')
    });
  }
}
