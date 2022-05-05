import { ConsultationModel } from "./../models/ConsultationModel";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/UserModel";

@Injectable({
  providedIn: "root",
})
export class ConsultationService {
  constructor(private http: HttpClient) {}

  options = {
    params: new HttpParams().append("token", localStorage.getItem("token")),
  };
  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getAll() {
    return this.http
      .post<ConsultationModel[]>(
        environment.endpoint + "/consultation/getAll",
        {},
        this.options
      )
      .pipe(retry(1), catchError(this.processError));
  }
  getById(id: any) {
    return this.http
      .post<ConsultationModel>(
        environment.endpoint + "/consultation/getById",
        id,
        this.options
      )
      .pipe(retry(1), catchError(this.processError));
  }
  save(cons: ConsultationModel): Observable<ConsultationModel> {
    return this.http
      .post<ConsultationModel>(
        environment.endpoint + "/consultation/add",
        cons,
        this.options
      )
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = "";
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
