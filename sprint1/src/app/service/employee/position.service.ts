import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../../model/employee/position';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private  http: HttpClient) {
  }


  public getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>('http://localhost:8080/api/manager-position/positions').pipe(
      map((response: any) => response));
  }
}
