import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private headers = {
    'Content-Type': 'application/json',
  };

  private url = 'https://localhost:44387';

  constructor(private http: HttpClient) {}
  getListaAnimales() {
    return this.http
      .get(`${this.url}/animales`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  getCarnes() {
    return this.http
      .get(`${this.url}/animales/carnes`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  getHierbas() {
    return this.http
      .get(`${this.url}/animales/hierbas`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  crearAnimal(animal) {
    return this.http
      .post(`${this.url}/animal`, animal, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error:', error.error.message);
    } else {
      console.error(`Backend code ${error.status}, ` + `body: ${error.error}`);
    }
    return throwError('Sucedio un problema. Intente de nuevo');
  }
}
