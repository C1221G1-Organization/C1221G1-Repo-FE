import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee/employee';
import * as empty from 'firebase/empty-import';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  http: HttpClient) {
  }

  saveEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/api/manager-employee/employees/', employee);
  }



  findEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${'http://localhost:8080/api/manager-employee/employees'}/${id}`);
  }


  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${'http://localhost:8080/api/manager-employee/employees'}/${id}`, employee);
  }

}
