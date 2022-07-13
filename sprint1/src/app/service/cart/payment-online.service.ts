import {Injectable} from '@angular/core';
import {CartAndDetailDto} from "../../dto/cart/CartAndDetailDto";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Discount} from '../../model/Discount';
import {CustomerDtoForCart} from '../../dto/cart/CustomerDtoForCart';

const API_URL = 'http://localhost:8080/api/carts';
const API_URL_PAYMENT = 'http://localhost:8080/api/payment-online';

@Injectable({
  providedIn: 'root'
})
export class PaymentOnlineService {

  private cartAndDetail = new BehaviorSubject<CartAndDetailDto>({});

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

  saveCartAndDetailAPI(cartAndDetailDto: CartAndDetailDto): Observable<any> {
    return this.http.post<CartAndDetailDto>(`${API_URL}/saveCart`, cartAndDetailDto);
  }

  getDiscount(id: string): Observable<Discount> {
    return this.http.get<Discount>(`${API_URL_PAYMENT}/discount/${id}`)
  }



}
