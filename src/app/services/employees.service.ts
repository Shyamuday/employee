import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  url = 'http://localhost:3000';
  constructor(private _http: HttpClient) { }

  postEmployeeDetails(data: any): Observable<Employee> {
    return this._http.post<Employee>(`${this.url}/employees`, data);
  }
  getEmployeeDetails(): Observable<any> {
    return this._http.get<any>(`${this.url}/employees`);
  }

  getEmployeeDetailsById(employeeId: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.url}/employees/${employeeId}`)
  }
}
