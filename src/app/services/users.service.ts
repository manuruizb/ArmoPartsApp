import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = environment.urlapi + "/users"

  constructor(
    private http: HttpClient
  ) { }

  auth(user: Users) {
    return this.http.post<Result<Users>>(`${this.url}/auth`, user);
  };

  forgotPassword(data: any) {
    return this.http.post<Result<string>>(`${this.url}/validate-send-email`, data);
  };

  recoveryPassword(contrasena: string, id_empleado: string) {
    return this.http.put<Result<string>>(`${this.url}/recovery-password`, {
      id_empleado,
      contrasena
    });
  }

}
