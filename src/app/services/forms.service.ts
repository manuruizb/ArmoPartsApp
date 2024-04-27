import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Forms } from '../models/forms.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private url: string = environment.urlapi + "/forms"

  constructor(
    private http: HttpClient
  ) { }

  create(form: Forms) {
    return this.http.post<Result<Forms>>(`${this.url}`, form);
  }

  getbyOrderId(id_pedido: string) {
    return this.http.get<Result<Forms[]>>(`${this.url}/${id_pedido}`);
  }

}
