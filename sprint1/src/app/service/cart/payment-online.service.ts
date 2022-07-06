import {Injectable} from '@angular/core';
import {CartDetailDto} from "../../dto/cart/CartDetailDto";
import {CartAndDetailDto} from "../../dto/cart/CartAndDetailDto";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const API_URL = 'http://localhost:8080/api/carts';

@Injectable({
  providedIn: 'root'
})
export class PaymentOnlineService {

  private cartAndDetail = new BehaviorSubject<CartAndDetailDto>({});
  // selectedCartAndDetail$ = this.cartAndDetail.asObservable();

  private static _cartAndDetailDto: CartAndDetailDto;

  constructor(private http: HttpClient) {
  }

  setCartAndDetail(cartAndDetail: CartAndDetailDto) {
    this.cartAndDetail.next(cartAndDetail);
    console.log("service")
    console.log(this.cartAndDetail)
  }

  getCartAndDetail() {
    return this.cartAndDetail.asObservable();
  }

  public getCartAndDetailDto(): CartAndDetailDto {
    return PaymentOnlineService._cartAndDetailDto;
  }

  public setCartAndDetailDto(value: CartAndDetailDto) {
    PaymentOnlineService._cartAndDetailDto = value;
  }

  saveCartAndDetailAPI(cartAndDetailDto: CartAndDetailDto): Observable<any> {
    return this.http.post<CartAndDetailDto>(`${API_URL}/saveCart`, cartAndDetailDto);
  }

}
