import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpRequest} from "../../dto/request/SignUpRequest";
import {SignInRequest} from "../../dto/request/SignInRequest";

const API : string = 'http://localhost:8080/api'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'c1221g1_impossible',

  })
};
@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http : HttpClient) { }

  signUp(obj : SignUpRequest): Observable<any>{
    return this.http.post<any>(`${API}/manager-security/users/sign-up`,obj);
  }

  signIn(obj : SignInRequest): Observable<any>{
    return this.http.post<any>(`${API}/manager-security/users/sign-in`,obj);
  }
}
