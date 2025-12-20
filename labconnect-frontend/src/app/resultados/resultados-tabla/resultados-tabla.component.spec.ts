import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosTablaComponent } from './resultados-tabla.component';
import { CommonModule } from '@angular/common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ResultadosTablaComponent', () => {
  let component: ResultadosTablaComponent;
  let fixture: ComponentFixture<ResultadosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosTablaComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosTablaComponent);
    component = fixture.componentInstance;
  });

  it('debe renderizar la tabla si hay resultados', () => {
    component.resultados = [
      { id: 1, examen: 'Sangre', estado: 'Finalizado' },
      { id: 2, examen: 'Orina', estado: 'Pendiente' }
    ];
    
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(2);
  });

  it('debe retornar las clases de CSS correctas para los estados', () => {
    expect(component.getEstadoClass('Finalizado')).toBe('bg-success');
    expect(component.getBadgeClass('Pendiente')).toBe('bg-warning');
    expect(component.getEstadoClass('En Proceso')).toBe('bg-info');
    expect(component.getEstadoClass('Desconocido')).toBe('bg-secondary');
  });

  it('debe recibir el rol de usuario correctamente mediante @Input', () => {
    component.userRole = 'ADMIN';
    fixture.detectChanges();
    expect(component.userRole).toBe('ADMIN');
  });
});