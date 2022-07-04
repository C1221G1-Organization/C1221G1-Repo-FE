import { Injectable } from '@angular/core';
import {Page} from 'ngx-pagination/dist/pagination-controls.directive';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImportInvoice} from '../model/import-invoice';

@Injectable({
  providedIn: 'root'
})
export class ImportInvoiceService {

  constructor(private http: HttpClient) {}

  /**
   * this function use to get list Import Invoice from be
   *
   * @author HongHTX
   * @Time 09:00 03/07/2022
   */
  public getAll(request): Observable<any> {
    const params = request;
    return this.http.get<Page>('http://localhost:8080/api/manager-medicine/import-invoice', {params});
  }

  /**
   * this function use to send id to be
   *
   * @author HongHTX
   * @Time 10:00 03/07/2022
   */
  public delete(id: string): Observable<ImportInvoice> {
    return this.http.delete<ImportInvoice>(`http://localhost:8080/api/manager-medicine/import-invoice/${id}`);
  }
}
