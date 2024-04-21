import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { firstValueFrom } from 'rxjs';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { Router } from '@angular/router';
import { Helpers } from '../../libs/helpers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  helpers = Helpers;

  forgotForm = new FormGroup({
    num_documento: new FormControl('', Validators.required),
    correo_electronico: new FormControl('', [Validators.required, Validators.email])
  });

  submited: boolean = false;

  constructor(
    private userservice: UsersService,
    private router: Router
  ) {

  }

  async forgot() {
    this.submited = true;

    if (this.forgotForm.invalid) {
      return;
    }

    const data = this.forgotForm.getRawValue();

    let result = await firstValueFrom(this.userservice.forgotPassword(data));
    if (result.success) {
      Dialog.show(result.data!, Dialogtype.success);
      this.router.navigate(["/"]);
    }

  }

}
