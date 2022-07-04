import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomer(request): Observable<any[]> {
    const params = request;
    return this.http.get<Customer[]>(API_URL + '/api/manager-customer/customers', {params});
  }

  search(value: any, value2: any): Observable<Customer[]> {
    console.log(value);
    console.log(value2);
    return this.http.get<Customer[]>(API_URL + `/api/manager-customer/customers?${value}=${value2}`);
  }

  delete(customerId: string) {
    return this.http.delete<Customer>(API_URL + `/api/manager-customer/customers/${customerId}`);
  }
}
