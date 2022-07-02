import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  http: HttpClient) {
  }

  saveEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/api/manager-employee/employees/', employee);
  }

  // updateCustomer(id: string, customer: Customer): Observable<Customer> {
  //   return this.http.patch<Customer>(`${'http://localhost:3000/customer'}/${id}`, customer);
  // }
}
