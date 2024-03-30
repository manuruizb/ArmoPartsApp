import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Areas } from '../models/areas.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private url: string = environment.urlapi + "/areas"

  constructor(
    private http: HttpClient
  ) { }

    getAll(){
      return this.http.get<Result<Areas[]>>(`${this.url}`);
    }

}
