import { Injectable } from '@angular/core';
import {MedicineSale} from "../dto/invoice/medicineSale";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {InvoiceDto} from "../dto/invoice/invoiceDto";
import {Prescription} from "../model/prescription";

const API_URL8080_SALE = `${environment.url8080retail}`;
@Injectable({
  providedIn: 'root'
})
export class RetailService {

  constructor(private  httpClient: HttpClient) { }
  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function getMedicineDto
* */
  public getMedicineDto(): Observable<MedicineSale[]> {
    return this.httpClient.get<MedicineSale[]>(API_URL8080_SALE + '/getMedicines');
  }
  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function createRetailInvoice
* */
  public createRetailInvoice(invoiceDto: InvoiceDto): Observable<void> {
    return this.httpClient.post<void>(API_URL8080_SALE + '/createRetail', invoiceDto);
  }

  /*
* Created by DaLQA
* Time: 10:53 AM 4/07/2022
* Function: function getAllPrescription
* */
  public getAllPrescription(page: number, id: string, names: string, target: string, symptom: string): Observable<Prescription[]> {
    return this.httpClient.get<Prescription[]>('http://localhost:8080/api/manager-prescription/prescriptions?page=' +
      `${page}` + '&id=' + `${id}` + '&names=' + `${names}` + '&target=' + `${target}` + '&symptom=' + `${symptom}`);
  }

}
