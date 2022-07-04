import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../model/invoice";
const API_URL = `${environment.apiUrl}`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAll(request): Observable<Invoice[]> {
    const params = request;
    return this.http.get<Invoice[]>(API_URL + '/api/manager-sale/invoices', {params});
  }
  public deleteInvoiceById(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(`${API_URL}/api/manager-invoice/invoices/${id}`,httpOptions)
  }
}
