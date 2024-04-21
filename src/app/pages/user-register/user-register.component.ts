import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employees } from '../../models/employees.model';
import { AreasService } from '../../services/areas.service';
import { Areas } from '../../models/areas.model';
import { firstValueFrom } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { passwordValidator } from '../../libs/password-validator';
import { Helpers } from '../../libs/helpers';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {

  helpers = Helpers;

  employeeForm = new FormGroup({
    primer_nombre: new FormControl('', Validators.required),
    segundo_nombre: new FormControl(null),
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl(null),
    tipo_documento: new FormControl('', Validators.required),
    num_documento: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl(new Date(), Validators.required),
    direccion: new FormControl('', Validators.required),
    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    id_area: new FormControl(null, Validators.required),
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', [Validators.required, passwordValidator()]),
  });

  submited: boolean = false;
  isAdmin: boolean = true;
  areasList: Areas[] = [];

  constructor(
    private areasservice: AreasService,
    private employeeservice: EmployeesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllAreas();
  }

  async register() {
    this.submited = true;

    if (this.employeeForm.invalid) {
      return;
    }

    const data = this.employeeForm.getRawValue() as Employees;

    let result = await firstValueFrom(this.employeeservice.create(data));
    if (result.success) {
      Dialog.show("Registro exitoso.", Dialogtype.success);
    }
    this.router.navigate(["/"]);

  }

  async getAllAreas() {
    let result = await firstValueFrom(this.areasservice.getAll());
    this.areasList = result.data!;
  }

  onChangeCargo(evt: any) {
    let value = evt.target.value;
    this.employeeForm.get("id_area")?.setValue(null);

    if (value === "Operativo") {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }


}
