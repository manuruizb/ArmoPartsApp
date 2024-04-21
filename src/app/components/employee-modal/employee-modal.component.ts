import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { passwordValidator } from '../../libs/password-validator';
import { Areas } from '../../models/areas.model';
import { firstValueFrom } from 'rxjs';
import { AreasService } from '../../services/areas.service';
import { EmployeesService } from '../../services/employees.service';
import { Helpers } from '../../libs/helpers';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { Employees } from '../../models/employees.model';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.scss'
})
export class EmployeeModalComponent implements OnInit {

  helpers = Helpers;
  modalTitle: string = '';
  numDocument: string = '';
  onEdit: boolean = false;

  employeeForm = new FormGroup({
    id_empleado: new FormControl('', Validators.required),
    primer_nombre: new FormControl('', Validators.required),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl(''),
    tipo_documento: new FormControl('', Validators.required),
    num_documento: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl(new Date(), Validators.required),
    direccion: new FormControl('', Validators.required),
    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    id_area: new FormControl('', Validators.required),
    usuario: new FormControl({ value: '', disabled: true }, Validators.required)
  });

  submited: boolean = false;
  isAdmin: boolean = true;
  areasList: Areas[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private areasservice: AreasService,
    private employeeservice: EmployeesService,
  ) { }


  disableFields() {
    this.employeeForm.disable();
  }

  async ngOnInit() {
    await this.getAllAreas();
    await this.getByDocuemnt();

    if (!this.onEdit) {
      this.disableFields();
    }

  }

  async getByDocuemnt() {
    let result = await firstValueFrom(this.employeeservice.getByDocument(this.numDocument));
    this.employeeForm.patchValue({
      id_empleado: result.data?.Empleado.id_empleado,
      primer_nombre: result.data?.Empleado.primer_nombre,
      segundo_nombre: result.data?.Empleado.segundo_nombre ? result.data?.Empleado.segundo_nombre : null,
      primer_apellido: result.data?.Empleado.primer_apellido,
      segundo_apellido: result.data?.Empleado.segundo_apellido ? result.data?.Empleado.segundo_apellido : null,
      tipo_documento: result.data?.Empleado.tipo_documento,
      num_documento: result.data?.Empleado.num_documento,
      fecha_nacimiento: result.data?.Empleado.fecha_nacimiento,
      direccion: result.data?.Empleado.direccion,
      correo_electronico: result.data?.Empleado.correo_electronico,
      celular: result.data?.Empleado.celular,
      genero: result.data?.Empleado.genero,
      cargo: result.data?.Empleado.cargo,
      id_area: result.data?.Empleado.id_area ? result.data?.Empleado.id_area : null,
      usuario: result.data?.usuario
    });

    let value = this.employeeForm.get("cargo")?.value;

    if (value === "Operativo") {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
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

  async save() {

    this.submited = true;

    if (this.employeeForm.invalid) {
      Dialog.show('Debes llenar todos los campos obligatorios', Dialogtype.warning);
      return;
    }

    const data = this.employeeForm.getRawValue() as Employees;

    const result = await firstValueFrom(this.employeeservice.update(data));
    if(result.success){
      Dialog.show(result.data!, Dialogtype.success);
      this.bsModalRef.hide();
    }

  }
}
