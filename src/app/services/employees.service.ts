import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';
import { Employees } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url: string = environment.urlapi + "/employees"

  constructor(
    private http: HttpClient
  ) { }

  create(employee: Employees){
    return this.http.post<Result<Employees>>(`${this.url}`, employee);
  }

}
