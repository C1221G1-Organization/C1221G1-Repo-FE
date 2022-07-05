import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerType} from '../model/customer/customer-type';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {
  constructor(private http: HttpClient) {
  }

  getAllCustomerType(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(API_URL + '/api/manager-customer/customerTypes');
  }
}
