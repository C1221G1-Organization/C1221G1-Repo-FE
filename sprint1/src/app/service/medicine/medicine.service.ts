import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicineDto} from '../../model/medicine/medicine-dto';
import {Medicine} from '../../model/medicine/medicine';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }


  /**
   * this function use to find exist medicine in BE throw api url
   *
   * @Author MyC
   * @Time 19:00 03/07/2022
   */
  public findMedicineById(id: string): Observable<MedicineDto> {
    return this.http.get<MedicineDto>(`${API_URL}/api/manager-medicine/medicines/${id}`);
  }


  /**
   * this function use delete medicine in BE throw api url
   *
   * @Author MyC
   * @Time 19:00 03/07/2022
   */
  public deleteMedicineById(id: string): Observable<Medicine> {
    return this.http.delete<Medicine>(`${API_URL}/api/manager-medicine/medicines/${id}`);
  }

  /**
   * this function use search and list medicine in BE throw api url
   *
   * @Author MyC
   * @Time 19:00 03/07/2022
   */
  public searchListMedicine(value1: any, value2: any, value3: any): Observable<MedicineDto[]> {
    console.log(`${API_URL}/api/manager-medicine/medicines/search?columName=${value1}&condition=${value2}&keyWord=${value3}`);
    // tslint:disable-next-line:max-line-length
    return this.http.get<MedicineDto[]>
    (`${API_URL}/api/manager-medicine/medicines/search?columName=${value1}&condition=${value2}&keyWord=${value3}`);
  }
}
