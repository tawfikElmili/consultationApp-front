import { UserModel } from './../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  registreUrl = 'api/users/register';
  register(register : UserModel) {
    return this.http.post(this.registreUrl, register);
  }
}
