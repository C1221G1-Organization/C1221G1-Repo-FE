import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Position} from "../../model/employee/position";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }


  public getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>('http://localhost:8080/api/manager-position/positions');
  }
}
