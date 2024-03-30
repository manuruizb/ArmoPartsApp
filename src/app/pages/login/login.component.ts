import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/user.model';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  });

  submited: boolean = false;


  constructor(
    private userservice: UsersService,
    private sessionservice: SessionService,
    private router: Router
  ) {

  }

  async login() {
    this.submited = true;

    if (this.userForm.invalid) {
      return;
    }

    const data = this.userForm.getRawValue() as Users;

    let result = await firstValueFrom(this.userservice.auth(data));
    this.sessionservice.setSession(result.data!); //guarda la sesión
    this.router.navigate(["/empleados"]); //redirecciona cuando inicie sesión
  }

}
