import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.scss'
})
export class MasterPageComponent implements OnInit {

  employeeName: string = '';
  employeeRole: string = '';

  constructor(
    private sessionService: SessionService,
    private router: Router

  ) {
  }

  ngOnInit(): void {
   
    const userData = this.sessionService.getSession();
    this.employeeName = userData.Empleado.primer_nombre + ' ' + userData.Empleado.primer_apellido;
    this.employeeRole = userData.Empleado.cargo;
  }

  closeSession() {
    this.sessionService.closeSession();
    this.router.navigate(['/']);
  }
}
