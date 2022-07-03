import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../../model/position';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  public getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(API_URL + `/api/manager-position/positions` );
  }
}
