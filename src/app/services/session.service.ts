import { Injectable } from '@angular/core';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSession(user: Users) {
    localStorage.setItem("user-session", JSON.stringify(user));
  };

  getSession() {
    return JSON.parse(localStorage.getItem("user-session")!) as Users;
  }
}
