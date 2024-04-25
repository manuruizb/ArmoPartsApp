import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionService } from '../../services/session.service';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { Forms } from '../../models/forms.model';
import { firstValueFrom } from 'rxjs';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {

  modalTitle: string = '';
  onEdit: boolean = false;
  id_pedido: string = '';

  formsForm = new FormGroup({
    id_empleado: new FormControl('', Validators.required),
    id_pedido: new FormControl('', Validators.required),
    entrada: new FormControl('', Validators.required),
    salida: new FormControl('', Validators.required)
  });


  submited: boolean = false;
 

  constructor(
    public bsModalRef: BsModalRef,
    private sessionService: SessionService,
    private formsService: FormsService
  ) { }


  async save() {

    this.submited = true;

    this.formsForm.get('id_empleado')?.setValue(this.sessionService.getSession().Empleado.id_empleado!);
    this.formsForm.get('id_pedido')?.setValue(this.id_pedido);

    if (this.formsForm.invalid) {
      Dialog.show('Debes llenar todos los campos obligatorios', Dialogtype.warning);
      return;
    }

    let data = this.formsForm.getRawValue() as Forms;

    const result = await firstValueFrom(this.formsService.create(data));

    if (result.success) {
      Dialog.show(`Formulario guardado con éxito`, Dialogtype.success);
      this.bsModalRef.hide();
    }
  }
}
