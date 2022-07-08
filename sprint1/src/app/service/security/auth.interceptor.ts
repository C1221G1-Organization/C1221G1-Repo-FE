import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization' //Spring boot Authorization method

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}
  token:any;
  user:any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.user = this.tokenStorageService.getUser();
    let authReq = request;
    this.token = this.tokenStorageService.getToken();
    if(this.token!==null){
      authReq = request.clone({
        setHeaders:{
          'content-type': 'application/json',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Origin':'*',
          'Authorization':'Bearer '+this.token
        }
      })
    }
    // if (this.token.getUser() != null) {
    //   this.token = this.tokenStorageService.getUser().token;
    // } else {
    //   this.token = '';
    // }
    // if (this.token != null) {
    //   authReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.token}`,
    //       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //     },
    //   });
    // }
    return next.handle(authReq);
  }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
