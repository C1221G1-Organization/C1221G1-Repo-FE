import {Injectable} from '@angular/core';
import {CartAndDetailDto} from "../../dto/cart/CartAndDetailDto";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const API_URL = 'http://localhost:8080/api/carts';

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

}
