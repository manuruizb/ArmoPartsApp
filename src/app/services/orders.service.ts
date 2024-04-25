import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/orders.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url: string = environment.urlapi + "/orders"

  constructor(
    private http: HttpClient
  ) { }

  create(order: Orders) {
    return this.http.post<Result<Orders>>(`${this.url}`, order);
  }

  getAll(page: number, pageSize: number, searchParameter?: string) {
    return this.http.get<Result<{ rows: Orders[], count: number }>>(`${this.url}`,
      {
        params: {
          page,
          pagesize: pageSize,
          searchparam: searchParameter ?? ''
        }
      }
    );
  }
}
