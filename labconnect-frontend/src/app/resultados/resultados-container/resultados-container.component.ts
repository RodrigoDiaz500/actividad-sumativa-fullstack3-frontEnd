import { Component, OnInit } from '@angular/core';
import { ResultadosTablaComponent } from '../resultados-tabla/resultados-tabla.component';
import { ResultadosService } from '../resultados-tabla/resultados.service';
import { ResultadoAnalisis } from '../resultados-tabla/resultado-analisis.model';
import { AuthService } from '../../auth/auth.service';

type UserRole = 'PATIENT' | 'ADMIN' | 'LAB' | 'MEDICO';

@Component({
  selector: 'app-resultados-container',
  standalone: true,
  imports: [ResultadosTablaComponent],
  template: `
    <app-resultados-tabla
      [resultados]="resultados"
      [userRole]="userRole">
    </app-resultados-tabla>
  `
})
export class ResultadosContainerComponent implements OnInit {

  resultados: ResultadoAnalisis[] = [];
  userRole!: UserRole;

  constructor(
    private resultadosService: ResultadosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();

    
    if (!user || !user.rol) {
      return;
    }

    this.userRole = user.rol as UserRole;

    // ADMIN , LAB  y medico ven todo
    if (this.userRole === 'ADMIN' || this.userRole === 'LAB'|| this.userRole === 'MEDICO') {
      this.resultadosService.getTodos().subscribe(data => {
        this.resultados = data;
      });
      return;
    }

    // PATIENT solo ve lo suyo
    if (this.userRole === 'PATIENT' && user.id !== undefined) {
      this.resultadosService.getPorUsuario(user.id).subscribe(data => {
        this.resultados = data;
      });
    }
  }
}
