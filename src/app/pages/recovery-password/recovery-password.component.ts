import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../libs/password-validator';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { passwordMatchValidator } from '../../libs/password-match-validator';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {

  recoveryForm = new FormGroup({
    contrasenia1: new FormControl('', [Validators.required, passwordValidator()]),
    contrasenia2: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator() });

  submited: boolean = false;
  id_empleado: string = '';

  constructor(
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(x => {
      this.id_empleado = x["idemployee"];
    })
  }

  async recovery() {
    this.submited = true;

    if (this.recoveryForm.invalid) {
      return;
    }

    const contrasenia = this.recoveryForm.get("contrasenia1")?.value;

    let result = await firstValueFrom(this.userservice.recoveryPassword(contrasenia!, this.id_empleado));
    if (result.success) {
      Dialog.show(result.data!, Dialogtype.success);
      this.router.navigate(["/"]);
    }

  }

}
