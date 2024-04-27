import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsService } from '../../services/forms.service';
import { AreasService } from '../../services/areas.service';
import { Areas } from '../../models/areas.model';
import { firstValueFrom } from 'rxjs';
import { Orders } from '../../models/orders.model';
import { Forms } from '../../models/forms.model';

@Component({
  selector: 'app-forms-detail',
  templateUrl: './forms-detail.component.html',
  styleUrl: './forms-detail.component.scss'
})
export class FormsDetailComponent implements OnInit {

  modalTitle: string = '';
  id_pedido: string = '';
  data: Orders | null = null;

  employeeName: string | null = null;
  input: string = '';
  output: string = '';

  areasList: Areas[] = [];
  formList: Forms[] = [];


  constructor(
    public bsModalRef: BsModalRef,
    private formsService: FormsService,
    private areasService: AreasService
  ) { }

  async ngOnInit() {
    await this.getAllAreas();
  }



  async getAllAreas(){

    const areas = (await firstValueFrom(this.areasService.getAll())).data!;

    const forms = (await firstValueFrom(this.formsService.getbyOrderId(this.id_pedido))).data!;

    this.formList = forms;
    this.areasList = areas.map(item => {

      return {
        ...item,
        check: forms.find(x=> x.Empleado.id_area === item.id_area) ? true : false
      }
    });

    console.log(forms)
  }

  viewDetail(index: number){

    if(!this.areasList[index].check){
      return;
    }

    this.areasList.forEach(x=> x.selected = false)

    this.areasList[index].selected = true;

    const areaId = this.areasList[index].id_area;

    const form = this.formList.find(x=> x.Empleado.id_area === areaId);

    this.employeeName = `${form?.Empleado.primer_nombre} ${form?.Empleado.segundo_nombre ?? ''} ${form?.Empleado.primer_apellido} ${form?.Empleado.segundo_apellido ?? ''}`

    this.input = form?.entrada!;
    this.output = form?.salida!;
  }

}
