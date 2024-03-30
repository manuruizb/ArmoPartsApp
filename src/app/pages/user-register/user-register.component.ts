import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employees } from '../../models/employees.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

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
    id_area: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  submited: boolean = false;

  constructor() {
    
  }

  async user_register(){
    this.submited = true;

    if(this.employeeForm.invalid){
      return;
    }

    const data = this.employeeForm.getRawValue() as Employees;

  }
}
