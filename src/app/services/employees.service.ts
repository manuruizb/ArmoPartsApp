import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';
import { Employees } from '../models/employees.model';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url: string = environment.urlapi + "/employees"

  constructor(
    private http: HttpClient
  ) { }

  create(employee: Employees) {
    return this.http.post<Result<Employees>>(`${this.url}`, employee);
  }

  getAll(page: number, pageSize: number, searchParameter?: string) {
    return this.http.get<Result<{ rows: Employees[], count: number }>>(`${this.url}`,
      {
        params: {
          page,
          pagesize: pageSize,
          searchparam: searchParameter ?? ''
        }
      }
    );
  }

  getByDocument(idEmpleado: string) {
    return this.http.get<Result<Users>>(`${this.url}/getUserByEmployeeId/${idEmpleado}`);
  }

  update(employee: Employees) {
    return this.http.put<Result<string>>(`${this.url}/${employee.id_empleado}`, employee);
  }

}
