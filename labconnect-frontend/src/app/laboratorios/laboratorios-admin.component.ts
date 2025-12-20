import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaboratoriosService } from '../laboratorios/laboratorios.service';
import { Laboratorio } from '../laboratorios/laboratorio.model';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-laboratorios-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './laboratorios-admin.component.html'
})
export class LaboratoriosAdminComponent implements OnInit {

  laboratorios: Laboratorio[] = [];
  editando = false;
  laboratorioId?: number;

  laboratorioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private laboratorioService: LaboratoriosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inicializar formulario aquí
    this.laboratorioForm = this.fb.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      activo: [true]
    });

    const user = this.authService.getLoggedInUser();
    if (!user || user.rol !== 'ADMIN') {
      alert('Acceso denegado');
      return;
    }
    this.cargarLaboratorios();
  }

  cargarLaboratorios(): void {
    this.laboratorioService.listar().subscribe(data => {
      this.laboratorios = data;
    });
  }

  guardar(): void {
    if (this.laboratorioForm.invalid) return;

    const lab = this.laboratorioForm.value as Laboratorio;

    if (this.editando && this.laboratorioId) {
      this.laboratorioService.actualizar(this.laboratorioId, lab)
        .subscribe(() => {
          this.reset();
          this.cargarLaboratorios();
        });
    } else {
      this.laboratorioService.crear(lab)
        .subscribe(() => {
          this.reset();
          this.cargarLaboratorios();
        });
    }
  }

  editar(lab: Laboratorio): void {
    this.editando = true;
    this.laboratorioId = lab.id;
    this.laboratorioForm.patchValue(lab);
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar laboratorio?')) return;

    this.laboratorioService.eliminar(id)
      .subscribe(() => this.cargarLaboratorios());
  }

  reset(): void {
    this.editando = false;
    this.laboratorioId = undefined;
    this.laboratorioForm.reset({ activo: true });
  }
}
