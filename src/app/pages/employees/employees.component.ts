import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { firstValueFrom } from 'rxjs';
import { Employees } from '../../models/employees.model';
import { DatatableDataValues } from '../../shared/datatable/datatable.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EmployeeModalComponent } from '../../components/employee-modal/employee-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> = {} as TemplateRef<any>;

  JSONdata: Employees[] = [];
  dataValues: Array<DatatableDataValues> = [];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;

  bsModalRef?: BsModalRef;
  constructor(
    private employeeService: EmployeesService,
    private modalService: BsModalService) {

  }

  async ngOnInit() {
    this.initializeDatatable();
    this.getAll(1);
  }

  initializeDatatable() {
    this.dataValues = [
      { id: 'num_documento', header: 'Documento' },
      { id: 'nombre', header: 'Nombre' },
      { id: 'cargo', header: 'Cargo' },
      { id: 'nombreArea', header: 'Area' },
      { header: '', template: this.actionsTemplate }
    ];
  }

  async getAll(page: number, searchParameter?: string) {
    this.currentPage = page;

    const result = await firstValueFrom(this.employeeService.getAll(page, this.itemsPerPage, searchParameter));

    if (result.data!.rows.length > 0) {
      this.totalItems = Number(result.data?.count);
    } else {
      this.totalItems = 0;
    }

    this.JSONdata = result.data!.rows!.map(item => {
      return {
        ...item,
        nombre: item.primer_nombre + ' ' + item.primer_apellido,
        nombreArea: item.Area?.area
      }
    });

  }

  onPageChanged(page: number) {
    this.getAll(page);
  }

  openModal(isEditable: boolean, numDocument?: any) {

    const initialState: ModalOptions = {
      initialState: {
        modalTitle: isEditable ? 'Editar empleado' : 'Información empleado',
        onEdit: isEditable,
        numDocument: numDocument
      },
      ignoreBackdropClick: true,
      class: 'modal-lg',
    };

    this.bsModalRef = this.modalService.show(EmployeeModalComponent, initialState);

    this.modalService.onHide.subscribe((reason: string | any) => {
      this.getAll(1);
    })
  }

}
