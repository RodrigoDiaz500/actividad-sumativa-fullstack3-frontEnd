/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  it('debe existir el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener resultados simulados', () => {
    const res = service.getResultados();
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].paciente).toBeDefined();
  });
});