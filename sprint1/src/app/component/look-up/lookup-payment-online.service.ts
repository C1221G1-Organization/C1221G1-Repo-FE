import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "ngx-pagination/dist/pagination-controls.directive";

const API_URL = 'http://localhost:8080/api/payment-online';

@Injectable({
  providedIn: 'root'
})
export class LookupPaymentOnlineService {

  constructor(private http: HttpClient) {
  }

  public getAll(request): Observable<any> {
    const params = request;
    return this.http.get<Page>(`${API_URL}`, {params});
  }
}
