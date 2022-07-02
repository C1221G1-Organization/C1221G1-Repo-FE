import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "ngx-pagination/dist/pagination-controls.directive";
import {HttpClient} from "@angular/common/http";
import {Supplier} from "../model/Supplier";
import {SupplierDto} from "../model/SupplierDto";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private  http: HttpClient) {
  }

  public getAll(request): Observable<any> {
    const params = request;
    return this.http.get<Page>(`http://localhost:8080/api/manager-medicine/medicines/supplier`, {params});
  }

  public deleteSupplier(id: string): Observable<Supplier> {
    return this.http.delete<Supplier>(`http://localhost:8080/api/manager-medicine/medicines/supplier/${id}`);
  }

  public saveSupplier(supplierDto): Observable<SupplierDto> {
    return this.http.post<SupplierDto>(`http://localhost:8080/api/manager-medicine/medicines/supplier`, supplierDto);
  }


  public findById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`http://localhost:8080/api/manager-medicine/medicines/supplier/${id}`);
  }

  public updateSupplier(idSupplier: string, supplierValue: Supplier) {
    return this.http.patch<Supplier>(`http://localhost:8080/api/manager-medicine/medicines/supplier/${idSupplier}`, supplierValue);
  }
}
