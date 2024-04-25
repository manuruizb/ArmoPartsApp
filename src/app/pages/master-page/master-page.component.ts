import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.scss'
})
export class MasterPageComponent implements OnInit {

  employeeName: string = '';
  employeeRole: string = '';
  employeeArea: string = '';

  constructor(
    private sessionService: SessionService,
    private router: Router

  ) {
  }

  ngOnInit(): void {
   
    const userData = this.sessionService.getSession();
    this.employeeName = userData.Empleado.primer_nombre + ' ' + userData.Empleado.primer_apellido;
    this.employeeRole = userData.Empleado.cargo;
    this.employeeArea = userData.Empleado.Area?.area!;
  }

  closeSession() {
    Dialog.show("¿Está seguro de cerrar la sesión?", Dialogtype.question).subscribe(yes => {
      if(yes){
        this.sessionService.closeSession();
        this.router.navigate(['/']);
      }
    })
    
  }
}
