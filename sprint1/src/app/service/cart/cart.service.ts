import {Injectable} from '@angular/core';
import {CartDetailDtoForList} from "../../dto/cart/CartDetailDtoForList";
import {MedicineDtoForCart} from "../../dto/cart/MedicineDtoForCart";
import {CartDetailDto} from "../../dto/cart/CartDetailDto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartAndDetailDto} from "../../dto/cart/CartAndDetailDto";

const API_URL = 'http://localhost:8080/api/carts';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  JSONDatas = [
    {
      "quantity": 1,
      "medicine": {
        "medicineId": "T-00006",
        "medicineName": "Kem chống muỗi hương cam Remos (70g)",
        "medicineImage": "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P13179_1_l.webp",
        "medicinePrice": 90000,
      }
    },
    {
      "quantity": 2,
      "medicine": {
        "medicineId": "T-00007",
        "medicineName": "Dầu xả ngăn rụng tóc Pharmacity Anti-hair Loss Conditioner (150ml)",
        "medicineImage": "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P13044_1_l.webp",
        "medicinePrice": 120000,
      }
    },
    {
      "quantity": 4,
      "medicine": {
        "medicineId": "T-00008",
        "medicineName": "Xịt chống muỗi hương cam Soffell (80ml)",
        "medicineImage": "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P05510_1_l.webp",
        "medicinePrice": 84000,
      }
    },
  ];

  constructor(private http: HttpClient) {
  }

  setCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.JSONDatas));
  }

  addToCart(medicine: MedicineDtoForCart, quantity: number) {
    //Kiem tra xem dã đăng nhập hay chưa
    // TH chưa đăng nhập
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
}
