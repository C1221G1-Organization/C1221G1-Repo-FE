import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicineDtoForCart} from "../../dto/cart/MedicineDtoForCart";
import {CartDetailDto} from "../../dto/cart/CartDetailDto";
import {CartAndDetailDto} from "../../dto/cart/CartAndDetailDto";
import {CustomerDtoForCart} from '../../dto/cart/CustomerDtoForCart';

const API_URL = 'http://localhost:8080/api/carts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  addToCart(medicine: MedicineDtoForCart, quantity: number) {
    let cartDetailDtos: CartDetailDto[] = [];
    if (localStorage.getItem('cart')) {
      cartDetailDtos = JSON.parse(localStorage.getItem('cart'));
    }
    let exists = false;

    cartDetailDtos.forEach(item => {
      if (item.medicine.medicineId == medicine.medicineId) {
        exists = true;
        if (quantity < 1 && item.quantity == 1) {
          item.quantity = 1;
        } else {
          item.quantity += quantity;
        }
      }
    });
    if (!exists && quantity > 0) {
      let cartDetailDto = {} as CartDetailDto;
      cartDetailDto.quantity = quantity;
      cartDetailDto.medicine = medicine;
      cartDetailDtos.push(cartDetailDto);
    }
    localStorage.setItem('cart', JSON.stringify(cartDetailDtos));
  }

  getCart(): CartDetailDto[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  removeItemFromCart(medicine: MedicineDtoForCart) {
    let cartDetailDtos: CartDetailDto[] = [];
    if (localStorage.getItem('cart')) {
      cartDetailDtos = JSON.parse(localStorage.getItem('cart'));
    }
    cartDetailDtos = cartDetailDtos.filter(item => item.medicine.medicineId !== medicine.medicineId);
    localStorage.setItem('cart', JSON.stringify(cartDetailDtos));
  }

  sendCartDetailToAPI(cartAndDetailDto: CartAndDetailDto): Observable<any> {
    return this.http.post<CartAndDetailDto>(`${API_URL}`, cartAndDetailDto);
  }

  clearCart() {
    localStorage.removeItem('cart');
  }
  /**
   * * @Author NghiaNTT
   * * @Time: 10/07/2022
   * * @param
   * * @return get customer info by username for chat
   * */
  getCustomerByUsername(username: string): Observable<CustomerDtoForCart> {
    return this.http.get<CustomerDtoForCart>(`${API_URL}/customer/${username}`);
  }
}
