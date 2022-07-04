import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
    return this.http.get(`${API_URL}/api/manager-customer/customers/${customerId}`);
  }

  update(customerId: string, customer: Customer): Observable<Customer | any> {
    return this.http.patch(`${API_URL}/api/manager-customer/customers/${customerId}`, customer);
  }


  checkPhoneNotTaken(customerPhone: string): Observable<boolean> {
    console.log(customerPhone + "!aemewdsjhgdkjghvsdkjyhg")
    return this.http.get('http://localhost:8080/api/manager-customer/customers?size=10000').pipe(
      map((res => {
            const customerList = res['content']
            return customerList.filter(prd =>

              prd.customerPhone == customerPhone)
          }
        )
      ), map(customerList =>
        !customerList.length  // length = 1 => false, length = 0 => true;
      ))

      ;
  }
}

