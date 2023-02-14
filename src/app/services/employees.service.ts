import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  url = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  postEmployeeDetails(data: any): Observable<any> {
    return this._http.post(`${this.url}/employees`, data);
  }
  getEmployeeDetails(): Observable<any> {
    return this._http.get(`${this.url}/employees`);
  }
}
