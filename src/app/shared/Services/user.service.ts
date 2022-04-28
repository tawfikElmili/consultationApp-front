import { environment } from './../../../environments/environment';
import { loginModel, UserModel } from './../models/UserModel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  registreUrl = 'api/users/register';
  getAllUserUrl = 'api/users/getAll';
  loginUrl = 'api/users/login';
  options = {
    params: new HttpParams().append('token', localStorage.getItem('token')),
  };
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(login: loginModel): Observable<any> {
    return this.http.post(environment.endpoint + '/api/users/login', login)
      .pipe(retry(1), catchError(this.processError));
  }
  register(register: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(environment.endpoint + '/users',
      JSON.stringify(register),
      this.httpHeader
    )
      .pipe(retry(1), catchError(this.processError));
  }
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.getAllUserUrl, this.options)
      .pipe(retry(1), catchError(this.processError));
  }

  oChangeUserStatus(id: string) {
    return this.http.post(environment.endpoint + '/users/giveAccess', id, this.options)
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
