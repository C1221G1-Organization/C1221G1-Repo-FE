import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../module/invoice";
import {Observable} from "rxjs";
import {Medicine} from "../module/medicine";
import {MedicineStorageDto} from "../dto/medicine-storage-dto";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

    createInvoice(invoice: Invoice):Observable<Invoice>{
    return this.http.post<Invoice>(API_URL + '/api/manager-sale/invoices/createWholesale', invoice)
    }
  getAll(): Observable<MedicineStorageDto[]> {
    return this.http.get<MedicineStorageDto[]>(API_URL + '/api/manager-sale/invoices/medicine');
  }
}
