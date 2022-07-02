import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  create(customer: Customer): Observable<Customer | any> {
    return this.http.post(API_URL + '/api/manager-customer/customers', customer);
  }

  // @ts-ignore
  findById(customerId: string): Observable<Customer | any> {
    return this.http.get(`${API_URL}/api/manager-customer/customers/customerId=${customerId}`);
  }

  update(customerId: string, customer: Customer): Observable<Customer | any> {
    return this.http.patch(`${API_URL}/api/manager-customer/customers/${customerId}`, customer);
  }
}

