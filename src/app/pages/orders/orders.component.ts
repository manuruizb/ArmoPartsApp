import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OrdersModalComponent } from '../../components/orders-modal/orders-modal.component';
import { SessionService } from '../../services/session.service';
import { ValidatePermissions } from '../../libs/validate-permissions';
import { firstValueFrom } from 'rxjs';
import { Orders } from '../../models/orders.model';
import { DatatableDataValues } from '../../shared/datatable/datatable.component';
import { OrdersService } from '../../services/orders.service';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  @ViewChild('registerTemplate', { static: true }) registerTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  @ViewChild('progressTemplate', { static: true }) progressTemplate: TemplateRef<any> = {} as TemplateRef<any>;

  math = Math;

  JSONdata: Orders[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 2;
  totalItems: number = 0;
  currentPage: number = 1;

  bsModalRef?: BsModalRef;

  permissions: ValidatePermissions = new ValidatePermissions(this.sessionService);
  idAdmin: boolean = false;
  totalProcess: number = 7


  constructor(
    private modalService: BsModalService,
    private sessionService: SessionService,
    private ordersService: OrdersService
  ) { }

  async ngOnInit() {
    this.initializeDatatable();
    this.getAll(1);
  }

  openModal(isEditable: boolean, id_pedido?: any) {

    const initialState: ModalOptions = {
      initialState: {
        modalTitle: isEditable ? 'Editar pedido' : 'Nuevo pedido',
        onEdit: isEditable,
        numDocument: id_pedido
      },
      ignoreBackdropClick: true,
      class: 'modal-lg',
    };

    this.bsModalRef = this.modalService.show(OrdersModalComponent, initialState);

    this.modalService.onHide.subscribe((reason: string | any) => {
      this.getAll(1);
    })
  }


  openModalForms(isEditable: boolean, id_pedido?: any) {

    const initialState: ModalOptions = {
      initialState: {
        modalTitle: isEditable ? 'Editar registro' : 'Nuevo registro',
        onEdit: isEditable,
        id_pedido: id_pedido
      },
      ignoreBackdropClick: true,
      class: 'modal-lg',
    };

    this.bsModalRef = this.modalService.show(FormModalComponent, initialState);

    this.modalService.onHide.subscribe((reason: string | any) => {
      this.getAll(1);
    })
  }

  initializeDatatable() {
    this.dataValues = [
      { header: '', template: this.registerTemplate },
      { id: 'num_pedido', header: '# Pedido' },
      { id: 'fecha_pedido', header: 'Fecha', date: true },
      { id: 'autoparte', header: 'Autoparte' },
      { id: 'cantidad', header: 'Cantidad' },
      { id: 'empleado', header: 'Creado por' },
      { header: 'Progreso', template: this.progressTemplate },
      { header: '', template: this.actionsTemplate }
    ];
  }

  async getAll(page: number, searchParameter?: string) {
    this.currentPage = page;

    const result = await firstValueFrom(this.ordersService.getAll(page, this.itemsPerPage, searchParameter));

    if (result.data!.rows.length > 0) {
      this.totalItems = Number(result.data?.count);
    } else {
      this.totalItems = 0;
    }

    console.log(result.data!.rows)
    this.JSONdata = result.data!.rows!.map(item => {
      return {
        ...item,
        autoparte: item.Autoparte?.nombre_autoparte,
        empleado: item.Empleado?.primer_nombre + ' ' + item.Empleado?.primer_apellido,
        registrado: item.formularios?.find(form => form.id_empleado === this.sessionService.getSession().Empleado.id_empleado) ? true : false
      }
    });

  }

  onPageChanged(page: number) {
    this.getAll(page);
  }
}
