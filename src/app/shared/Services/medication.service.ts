import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MedicationModel } from '../models/Medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http: HttpClient) {

  }

  options = {
    params: new HttpParams().append('token', localStorage.getItem('token')),
  };
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  save(med: MedicationModel): Observable<MedicationModel> {
    return this.http.post<MedicationModel>(environment.endpoint + '/medication/add',
      JSON.stringify(med),
      this.httpHeader
    )
      .pipe(retry(1), catchError(this.processError));
  }

  getById(id: any): Observable<MedicationModel> {
    return this.http.post<MedicationModel>(environment.endpoint + '/medication/getById',
      id,
      this.httpHeader
    )
      .pipe(retry(1), catchError(this.processError));
  }
  getMedicationsByConsultation(id: number): Observable<MedicationModel[]> {
    return this.http
      .get<MedicationModel[]>(
        environment.endpoint + "/medication/getByConsultation/" + +id,
        this.options
      )
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
