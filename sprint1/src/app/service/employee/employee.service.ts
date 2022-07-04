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

  /**
   * this function use to get all page Employee
   *
   * @author GiangTB
   * @Time 15:30 02/07/2022
   */
  public getAllEmployee(request): Observable<Employee[]> {
    const params = request;
    return this.http.get<Employee[]>(API_URL + `/api/manager-employee/employees`, {params});
  }

  /**
   * this function use to get all page Employee
   *
   * @author GiangTB
   * @Time 19:00 02/07/2022
   */
  public deleteEmployeeById(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${API_URL}/api/manager-employee/employees/${id}`)
  }
}
