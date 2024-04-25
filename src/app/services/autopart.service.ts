import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Autopart } from '../models/autopart.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class AutopartService {

  private url: string = environment.urlapi + "/autoparts"

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Result<Autopart[]>>(`${this.url}`);
  }
}
