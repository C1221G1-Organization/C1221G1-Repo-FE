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
  /*
    Created by TamNA
    Time: 08:50:00 03/07/2022
    Function:  save employee
  */
  saveEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/api/manager-employee/employees', employee);
  }


  /*
     Created by TamNA
     Time: 08:55:00 03/07/2022
     Function:  save employee
   */
  findEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${'http://localhost:8080/api/manager-employee/employees'}/${id}`);
  }

  /*
     Created by TamNA
     Time: 09:00:00 03/07/2022
     Function:  save employee
   */
  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${'http://localhost:8080/api/manager-employee/employees'}/${id}`, employee);
  }

}
