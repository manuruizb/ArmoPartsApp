import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = environment.urlapi + "/users"

  constructor(
    private http: HttpClient
  ) { }

  auth(user: Users) {
    return this.http.post<Users>(`${this.url}/auth`, user);
  }
}
