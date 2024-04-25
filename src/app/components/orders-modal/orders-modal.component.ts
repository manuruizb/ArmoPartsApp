import { Component, OnInit } from '@angular/core';
import { Helpers } from '../../libs/helpers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Autopart } from '../../models/autopart.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { firstValueFrom } from 'rxjs';
import { AutopartService } from '../../services/autopart.service';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { OrdersService } from '../../services/orders.service';
import { Orders } from '../../models/orders.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrl: './orders-modal.component.scss'
})
export class OrdersModalComponent implements OnInit {

  helpers = Helpers;
  modalTitle: string = '';
  onEdit: boolean = false;

  ordersForm = new FormGroup({
    id_empleado: new FormControl('', Validators.required),
    id_autoparte: new FormControl('', Validators.required),
    cantidad: new FormControl(null, Validators.required)
  });


  submited: boolean = false;
  isAdmin: boolean = true;
  autoPartsList: Autopart[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private autopartService: AutopartService,
    private ordersService: OrdersService,
    private sessionService: SessionService
  ) { }

  async ngOnInit() {
    await this.getAllAutoparts();
  }

  async save() {

    this.submited = true;

    this.ordersForm.get('id_empleado')?.setValue(this.sessionService.getSession().Empleado.id_empleado!);

    if (this.ordersForm.invalid) {
      Dialog.show('Debes llenar todos los campos obligatorios', Dialogtype.warning);
      return;
    }

    let data = this.ordersForm.getRawValue() as Orders;

    const result = await firstValueFrom(this.ordersService.create(data));

    if (result.success) {
      Dialog.show(`Pedido creado con éxito, pedido #${result.data?.num_pedido}`, Dialogtype.success);
      this.bsModalRef.hide();
    }
  }

  async getAllAutoparts() {
    let result = await firstValueFrom(this.autopartService.getAll());
    this.autoPartsList = result.data!;
  }

}
