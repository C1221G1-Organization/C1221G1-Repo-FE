import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getAllEmployee(request): Observable<Employee[]> {
    const params = request;
    return this.http.get<Employee[]>(API_URL + `/api/manager-employee/employees`, {params});
  }

  public deleteEmployeeById(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${API_URL}/api/manager-employee/employees/${id}`)
  }
}
